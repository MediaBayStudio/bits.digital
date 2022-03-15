<?php

// figcaption for media-text
add_filter( 'render_block', function( $block_content, $block ) {
  global $webp_support, $post;

  if ( $post->post_type !== 'case' ) {
    return;
  }

  if ( $block['blockName'] === 'core/image' ) {
    $image_id = $block['attrs']['id'];

    if ( $image_id ) {
      $image = get_post( $image_id );

      # $block_content = preg_replace( '/\swidth=".*?"\sheight=".*?"/', '', $block_content );

      // var_dump( $block_content );
    }
  }
  return $block_content;
}, 10, 2 );