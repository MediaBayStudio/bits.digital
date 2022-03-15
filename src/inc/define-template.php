<?php
// Define template
add_filter( 'template_include', function( $template ) {
  global $post;
  
  $GLOBALS['current_template'] = pathinfo( $template )['filename'];

  if ( $post->post_type === 'page' ) {
    $page_template_id = $post->ID;
  } else {
    $page = get_pages( [
      'meta_key' => '_wp_page_template',
      'meta_value' => $GLOBALS['current_template'] . '.php'
    ] )[0];

    $page_template_id = $page->ID;
  }

  $GLOBALS['sections'] = get_field( 'sections', $page_template_id );
  return $template;
} );