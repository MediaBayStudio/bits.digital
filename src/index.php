<?php

/*
	Template name: index
*/

get_header();

$section_index = 0;

foreach ( $GLOBALS['sections'] as $section ) {
	if ( $section['is_visible'] ) {
		$section_name = $section['acf_fc_layout'];
		$section_id = $section['id'] ? ' id="' . $section['id'] . '"' : '';
		require "template-parts/{$section_name}.php";
	}
	$section_index++;
}

get_footer();