<?php
// Print urls and path in javascript
// add_action( 'admin_head', 'print_site_data' );
add_action( 'wp_body_open', function() {
  global $site_url, $template_directory_uri, $template_directory;
  echo "<script>var siteUrl = '{$site_url}', templateDirectoryUri = '{$template_directory_uri}', templateDirectory = '{$template_directory}'</script>";
} );