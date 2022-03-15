<?php

function create_case_card( $case, $print = true, $lazyload = true ) {
  $case_html = '';
  if ( is_array( $case ) ) {
    $case = get_post( $case['id'] );
  }
  $case_id = $case->ID;
  $case_thumbnail = get_field( 'img', $case_id );
  $thumbnail_id = $case_thumbnail['id'];
  $thumbnail_url = $case_thumbnail['url'];
  $images_html = '';
  $terms = get_the_terms( $case_id, 'case_category' );
  if ( $terms ) {
    $term = $terms[0];
  }

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
    $thumbnail_webp_url = image_get_intermediate_size( $thumbnail_id, 'webp' )['url'];
    $thumbnail_sizes = [
      [
        'media' => '(max-width:1023.98px)',
        'img_data' => 'fullscreen_mobile_webp',
        'img_2x_data' => 'fullscreen_mobile_2x_webp',
        'default_2x' => $thumbnail_webp_url
      ],
      [
        'media' => '(max-width:1023.98px)',
        'img_data' => 'fullscreen_mobile',
        'img_2x_data' => 'fullscreen_mobile_2x',
        'default_2x' => $thumbnail_url
      ],
      [
        'media' => '(min-width:1023.98px)',
        'img_data' => 'fullscreen_tablet_webp',
        'img_2x_data' => 'fullscreen_tablet_2x_webp',
        'default_2x' => $thumbnail_webp_url
      ],
      [
        'media' => '(min-width:1023.98px)',
        'img_data' => 'fullscreen_tablet',
        'img_2x_data' => 'fullscreen_tablet_2x',
        'default_2x' => $thumbnail_url
      ]
    ];

    foreach ( $thumbnail_sizes as $thumbnail_size ) {
      $img_data = image_get_intermediate_size( $thumbnail_id, $thumbnail_size['img_data'] );
      $img_2x_data = image_get_intermediate_size( $thumbnail_id, $thumbnail_size['img_2x_data'] );
      if ( $img_data ) {
        $images_html .= '<source type="' . $img_data['mime-type'] . '" media="' . $thumbnail_size['media'] . '" ' . $source_attr . $img_data['url'] . '';

        if ( $img_2x_data ) {
          $images_html .= ', ' . $img_2x_data['url'] . ' 2x';
        } else {
          $images_html .= ', ' . $thumbnail_size['default_2x'] . ' 2x';
        }

        $images_html .= '">';
      }
    }

    $img_url = $thumbnail_url;
  } else {
    $img_url = $template_directory_uri . '/img/img-placeholder.svg';
  }

  if ( $term ) {
    $term = '<span class="case__category">' . $term->name . '</span>';
  }

  $case_html .= '<li class="cases__case case" data-id="' . $case_id . '" tabindex="0">
    <picture class="case__pic' . $pic_class . '">' . $images_html . '
      <img ' . $img_attr . $img_url . '" alt="' . $case->post_title . '" class="case__img">
    </picture>
    <h4 class="case__title">' . $case->post_title . '</h4>' . $term . '
  </li>';

  if ( $print ) {
    echo $case_html;
  } else {
    return $case_html;
  }
}