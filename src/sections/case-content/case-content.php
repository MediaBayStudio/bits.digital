<div class="case-popup popup">
  <div class="case-popup__hdr container">
    <div class="case-popup__hdr-inner">
      <button type="button" class="case-popup__close icon-corner-arrow">Back</button>
    </div>
  </div>
  <div class="case-popup__heading container">
    <div class="case-popup__heading-inner">
      <span class="case-popup__title"><?php echo get_the_title( 88 ) ?></span> <?php
      $img = get_field( 'img', 88 );
      $img_id = $img['id'];
      $img_url = $img['url'];

      $sizes = [
        [
          'size_name' => 'fullscreen_mobile',
          'media' => '(max-width:575.98px)'
        ],
        [
          'size_name' => 'fullscreen_laptop',
          'media' => '(min-width:575.98px) and (max-width:767.98px'
        ],
        [
          'size_name' => 'fullscreen_desktop',
          'media' => '(min-width:767.98px)'
        ]
      ];

      $images_html = '';

      $lazyload = fasle;

      if ( $lazyload ) {
        $pic_class = ' lazy';
        $source_attr = 'srcset="#" data-srcset="';
        $img_attr = 'src="#" data-src="';
      } else {
        $pic_class = '';
        $source_attr = 'srcset="';
        $img_attr = 'src="';
      }

      foreach ( $sizes as $size ) {
        $image_webp = image_get_intermediate_size( $img_id, $size['size_name'] . '_webp' );
        $image_2x_webp = image_get_intermediate_size( $img_id, $size['size_name'] . '_2x_webp' );
        $image = image_get_intermediate_size( $img_id, $size['size_name'] . '_mobile' );
        $image_2x = image_get_intermediate_size( $img_id, $size['size_name'] . '_2x' );


        if ( !$image_webp ) {
          $image_webp = image_get_intermediate_size( $img_id, 'webp' );
          $image_2x_webp = '';
        }

        if ( $image_webp ) {
          $images_html .= '<source media="' . $size['media'] . '" type="' . $image_webp['mime-type'] . '" ' . $source_attr . $image_webp['url'];
          if ( $image_2x_webp ) {
            $images_html .= ', ' . $image_2x_webp['url'] . ' 2x';
          }
          $images_html .= '">';
        }

        if ( $image ) {
          $images_html .= '<source media="' . $size['media'] . '" type="' . $image['mime-type'] . '" ' . $source_attr . $image['url'];
          if ( $image_2x ) {
            $images_html .= ', ' . $image_2x['url'] . ' 2x';
          }
          $images_html .= '">';
        }
      }
      echo '<picture class="case-popup__pic' . $pic_class . '">' . $images_html . '
      <img ' . $img_attr . $img_url . '" alt="' . 'alt' . '" class="case-popup__img">
      </picture>' ?>
    </div>
  </div>
  <div class="case-popup__body container">
    <div class="case-popup__body-inner"> <?php
      $post = get_post(88);
      the_content() ?>
    </div>
  </div>
</div>