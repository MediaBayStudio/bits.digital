<?php

function create_link_preload( $args ) {

  if ( is_string( $args ) ) {
    $args = [
      'url' => $args
    ];    
  }

  if ( !$args['url'] ) {
    return;
  }

  $defaults = [
    'url' => '',
    'imagesrcset' => '',
    'type' => '',
    'as' => 'image',
    'media' => '',
    'print' => true
  ];

  $parsed_args = wp_parse_args( $args, $defaults );
  $media = $parsed_args['media'] ? ' media="' . $parsed_args['media'] . '"' : '';
  $type = $parsed_args['type'] ? ' type="' . $parsed_args['type'] . '"' : '';
  $imagesrcset = $parsed_args['imagesrcset'] ? ' imagesrcset="' . $parsed_args['imagesrcset'] . '"' : '';

  $link_tag = "<link rel=\"preload\" as=\"{$parsed_args['as']}\"{$type} href=\"{$parsed_args['url']}\"${imagesrcset}{$media} />";

  if ( $parsed_args['print'] ) {
    echo $link_tag . PHP_EOL;
  } else {
    return $link_tag;
  }
}