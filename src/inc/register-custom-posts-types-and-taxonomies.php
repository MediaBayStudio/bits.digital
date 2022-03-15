<?php

add_action( 'init', function() {
  register_post_type( 'case', [
    'label'  => null,
    'labels' => [
      'name'               => 'Cases',
      'singular_name'      => 'Case',
      'add_new'            => 'Add',
      'add_new_item'       => 'Add',
      'edit_item'          => 'Edit',
      'new_item'           => 'New',
      'view_item'          => 'View',
      'search_items'       => 'Search',
      'not_found'          => 'Not found',
      'not_found_in_trash' => 'Not found in trash',
      'parent_item_colon'  => '',
      'menu_name'          => 'Cases',
    ],
    'description'         => '',
    'public'              => true,
    'show_in_menu'        => null,
    'show_in_rest'        => true,
    'rest_base'           => 'cases',
    'menu_position'       => null,
    'menu_icon'           => 'dashicons-portfolio',
    'hierarchical'        => false,
    'supports'            => [ 'title', 'editor' ],
    'taxonomies'          => [ 'case_category' ]
  ] );


  register_taxonomy( 'case_category', ['case'], [
    'label'                 => '',
    'labels'                => [
      'name'              => 'Categoies',
      'singular_name'     => 'Category',
      'search_items'      => 'Search',
      'all_items'         => 'Adll',
      'view_item '        => 'View',
      'parent_item'       => 'Parent',
      'parent_item_colon' => 'Parent:',
      'edit_item'         => 'Edit',
      'update_item'       => 'Update',
      'add_new_item'      => 'Add',
      'new_item_name'     => 'New',
      'menu_name'         => 'Categoies',
    ],
    'show_in_rest'          => true,
    'hierarchical'          => true,
    'meta_box_cb'           => false
  ] );

  register_post_type( 'teammate', [
    'label'  => null,
    'labels' => [
      'name'               => 'Team',
      'singular_name'      => 'Team',
      'add_new'            => 'Add',
      'add_new_item'       => 'Add',
      'edit_item'          => 'Edit',
      'new_item'           => 'New',
      'view_item'          => 'View',
      'search_items'       => 'Search',
      'not_found'          => 'Not found',
      'not_found_in_trash' => 'Not found in trash',
      'parent_item_colon'  => '',
      'menu_name'          => 'Team',
    ],
    'description'         => '',
    'public'              => true,
    'show_in_menu'        => null,
    'show_in_rest'        => true,
    'rest_base'           => 'teammates',
    'menu_position'       => null,
    'menu_icon'           => 'dashicons-groups',
    'hierarchical'        => false,
    'supports'            => [ 'title' ],
    'taxonomies'          => []
  ] );

  register_rest_field( 'case', 'html', [
    'get_callback' => function( $post, $field_name, $request ) {
      $html = create_case_card( $post, false, false );
      return $html;
    }
  ] );

  register_rest_field( 'teammate', 'html', [
    'get_callback' => function( $post, $field_name, $request ) {
      $html = create_teammate_card( $post, false, false );
      return $html;
    }
  ] );

});

