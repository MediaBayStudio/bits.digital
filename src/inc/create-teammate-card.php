<?php

function create_teammate_card( $teammate, $print = true, $lazyload = true ) {
  $teammate_html = '';
  if ( is_array( $teammate ) ) {
    $teammate = get_post( $teammate['id'] );
  }
  $teammate_id = $teammate->ID;
  $teammate_thumbnail = get_field( 'img', $teammate_id );
  $thumbnail_id = $teammate_thumbnail['id'];
  $thumbnail_url = $teammate_thumbnail['url'];
  $images_html = '';
  $role = get_field( 'role', $teammate_id );

  if ( $lazyload ) {
    $pic_class = ' lazy';
    $source_attr = 'srcset="#" data-srcset="';
    $img_attr = 'src="#" data-src="';
  } else {
    $pic_class = '';
    $source_attr = 'srcset="';
    $img_attr = 'src="';
  }

  if ( $thumbnail_id ) {
    $image_webp = image_get_intermediate_size( $thumbnail_id, 'fullscreen_mobile_webp' );
    $image_2x_webp = image_get_intermediate_size( $thumbnail_id, 'fullscreen_mobile_2x_webp' );
    $image = image_get_intermediate_size( $thumbnail_id, 'fullscreen_mobile' );
    $image_2x = image_get_intermediate_size( $thumbnail_id, 'fullscreen_mobile_2x' );

    if ( !$image_webp ) {
      $image_webp = image_get_intermediate_size( $thumbnail_id, 'webp' );
      $image_2x_webp = '';
    }

    if ( $image_webp ) {
      $images_html .= '<source type="' . $image_webp['mime-type'] . '" ' . $source_attr . $image_webp['url'];
      if ( $image_2x_webp ) {
        $images_html .= ', ' . $image_2x_webp['url'] . ' 2x';
      }
      $images_html .= '">';
    }

    if ( !$image ) {
      $image = $teammate_thumbnail;
      $image_2x = '';
    }

    if ( $image ) {
      $images_html .= '<source type="' . $image['mime-type'] . '" ' . $source_attr . $image['url'];
      if ( $image_2x ) {
        $images_html .= ', ' . $image_2x['url'] . ' 2x';
      }
      $images_html .= '">';
    }

    $img_url = $thumbnail_url;
  } else {
    $img_url = $template_directory_uri . '/img/img-placeholder.svg';
  }

  if ( $role ) {
    $role = '<span class="teammate__role">' . $role . '</span>';
  }

  $teammate_html .= '<li class="teammates__teammate teammate" data-id="' . $teammate_id . '">
    <picture class="teammate__pic' . $pic_class . '">' . $images_html . '
      <img ' . $img_attr . $img_url . '" alt="' . $teammate->post_title . '" class="teammate__img">
    </picture>
    <h4 class="teammate__title">' . $teammate->post_title . '</h4>' . $role . '
  </li>';

  if ( $print ) {
    echo $teammate_html;
  } else {
    return $teammate_html;
  }
}