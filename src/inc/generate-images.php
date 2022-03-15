<?php

$image_sizes = [
  // 'case_mobile' => 450, fullscreen_mobile
  // 'case_mobile_2x' => 900, fullscreen_mobile

  // 'case_tablet' => 325, team_desktop
  // 'case_tablet_2x' => 650, team_desktop_2x

  // 'case_laptop' => 435, fullscreen_mobile
  // 'case_laptop_2x' => 870, fullscreen_mobile_2x

  // 'case_desktop' => 600, fullscreen_tablet
  // 'case_desktop_2x' => 1200, fullscreen_tablet_2x

  // 'team_mobile' => 450, fullscreen_mobile
  // 'team_mobile_2x' => 900, fullscreen_mobile

  // 'team_tablet' => 210, team_laptop
  // 'team_tablet_2x' => 420, team_laptop_2x

  // 'team_laptop' => 280, fullscreen_mobile
  // 'team_laptop_2x' => 560, fullscreen_mobile_2ч

  // 'team_desktop' => 375, fullscreen_mobile
  // 'team_desktop_2x' => 750, fullscreen_mobile_2x

  'fullscreen_mobile' => 450,
  'fullscreen_mobile_2x' => 900,

  'fullscreen_tablet' => 670,
  'fullscreen_tablet_2x' => 1340,

  'fullscreen_laptop' => 905,
  'fullscreen_laptop_2x' => 1810,

  'fullscreen_deskop' => 1200,
  'fullscreen_deskop_2x' => 2400

  // 'size' => 576,
  // 'size' => [300, 400]
];

if ( $image_sizes ) {
  foreach ( $image_sizes as $size_name => $demensions ) {
    if ( is_array( $demensions ) ) {
      $height = $demensions[1];
      $width = $demensions[0];
    } else {
      $width = $demensions;
      $height = 0;
    }
    add_image_size( $size_name, $width, $height, true );
  }
}

add_action( 'wp_generate_attachment_metadata', 'generate_webp', 10, 3 );

function generate_webp( $metadata, $img_id ) {
  global $image_sizes, $upload_basedir, $template_directory;

  $main_img_path = get_attached_file( $img_id );
  // if ( $metadata === [] ) {
  //   $update = true;
  //   $metadata = wp_get_attachment_metadata( $img_id );
  // }
  $main_img_pathinfo = pathinfo( $main_img_path );
  $main_img_dirname = $main_img_pathinfo['dirname'];
  $main_img_filename = $main_img_pathinfo['filename'];
  $main_img_basename = $main_img_pathinfo['basename'];
  $main_image_data = getimagesize( $main_img_path );
  $main_image_width = $main_image_data[0];
  $main_image_height = $main_image_data[1];

  foreach ( $image_sizes as $size_name => $width ) {
    $file = image_get_intermediate_size( $img_id, $size_name );

    if ( $file ) {
      $filepath = $main_img_dirname . DIRECTORY_SEPARATOR . $file['file'];
      $file_pathinfo = pathinfo( $filepath );
      $image_data = getimagesize( $filepath );
      $image_width = $image_data[0];
      $image_height = $image_data[1];

      $webp_basename = $file_pathinfo['filename'] . '.webp';
      $webp_filepath = $main_img_dirname . DIRECTORY_SEPARATOR . $webp_basename;
      $webp_size_name = $size_name . '_webp';
      $mime_type = 'image/webp';

      $metadata['sizes'][ $webp_size_name ] = [
        'file' => $webp_basename,
        'width' => $image_width,
        'height' => $image_height,
        'mime-type' => $mime_type
      ];

      $cwebp_command = "/usr/local/bin/cwebp -q 90 {$file['file']} -o {$webp_basename}";
      chdir( $main_img_dirname );
      exec( $cwebp_command );
    }
  }

  $main_img_webp_basename = $main_img_filename . '.webp';
  $cwebp_command = "/usr/local/bin/cwebp -q 90 {$main_img_basename} -o {$main_img_webp_basename}";

  chdir( $main_img_dirname );
  exec( $cwebp_command );

  if ( !$img_post_meta['minified'] ) {
    minify_img( $main_img_path );
    update_post_meta( $img_id, 'minified', true );
  }

  if ( stripos( $main_img_basename, '-scaled' ) !== false ) {
    $original_img_filepath = str_replace( '-scaled', '', $main_img_path );
    minify_img( $original_img_filepath, null, 75 );
  }

  $metadata['sizes']['webp'] = [
    'file' => $main_img_webp_basename,
    'width' => $main_image_width,
    'height' => $main_image_height,
    'mime-type' => 'image/webp'
  ];

  // if ( $update ) {
  //   $updated = wp_update_attachment_metadata( $img_id, $metadata );
  // } else {
    return $metadata;
  // }
}

function minify_img( $src, $dest = null, $quality = 90 ) {
  if ( is_null( $dest ) ) {
    $dest = $src;
  }

  $info = getimagesize( $src );

  if ( $info['mime'] === 'image/jpeg' ) {
    $image = imagecreatefromjpeg( $src );
    $is_jpg = true;
  } elseif ( $info['mime'] === 'image/gif' ) {
    $image = imagecreatefromgif( $src );
  } elseif ( $info['mime'] === 'image/png' ) {
    $is_png = true;
    $image = imagecreatefrompng( $src );
  }

  if ( $is_jpg ) {
    imagejpeg( $image, $dest, $quality );
  } else if ( $is_png ) {
    $quality = $quality / 10;
    imagesavealpha( $image, true);
    imagepng( $image, $dest, $quality );
  }

  return $dest;
}
