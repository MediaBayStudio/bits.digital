<?php
global
  $webp_support,
  $address,
  $address_link,
  $email,
  $instagram,
  $facebook,
  $tel,
  $tel_clean,
  $version,
  $site_url,
  $logo_url,
  $svg_icons,
  $screen_widths,
  $template_directory,
  $template_directory_uri;

  $preload = [ $logo_url ];

  $preload[] = [
    'media' => '(max-width:1023.98px)',
    'url' => $template_directory_uri . '/img/icon-burger.svg'
  ];

  if ( is_front_page() ) {
    $script_name = 'script-index';
    $style_name = 'style-index';
  } else if ( is_404() ) {
    $script_name = '';
    $style_name = 'style-index';
   } else {
    if ( $current_template ) {
      $script_name = 'script-' . $GLOBALS['current_template'];
      $style_name = 'style-' . $GLOBALS['current_template'];
    } else {
      $script_name = '';
      $style_name = '';
    }
  }

  $GLOBALS['page_script_name'] = $script_name;
  $GLOBALS['page_style_name'] = $style_name ?>

<!DOCTYPE html>
<html <?php language_attributes() ?>>
<head>
  <script src="https://polyfill.io/v3/polyfill.min.js?features=CustomEvent%2CIntersectionObserver%2CIntersectionObserverEntry%2CElement.prototype.closest%2CElement.prototype.dataset%2CHTMLPictureElement"></script>
  <meta charset="<?php bloginfo('charset') ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <!-- styles preload --> <?php
	foreach ( $screen_widths as $screen_width ) :
    echo PHP_EOL;
    if ( $screen_width === "0" ) {
      $media = '';
    } else {
      $media = ' media="(min-width:' . ($screen_width - 0.02) . 'px)"';
    }
		$suffix = $screen_width === '0' ? '' : '.' . $screen_width ?>
  <link rel="preload" as="style"<?php echo $media ?> href="<?php echo "{$template_directory_uri}/style{$suffix}.css?ver={$version}" ?>">
  <link rel="preload" as="style"<?php echo $media ?> href="<?php echo "{$template_directory_uri}/css/{$style_name}{$suffix}.css?ver={$version}" ?>" /> <?php
	endforeach;
  echo PHP_EOL ?>
  <!-- fonts preload --> <?php
	$fonts = [
		'Syne-Bold.woff',
		'Syne-SemiBold.woff',
		'Syne-Regular.woff',
		'WorkSans-Regular.woff',
		// 'WorkSans-Light.woff'
    'WorkSans-ExtraLight.woff'
	];
	foreach ( $fonts as $font ) :
    echo PHP_EOL ?>
  <link rel="preload" href="<?php echo "$template_directory_uri/fonts/$font" ?>" as="font" type="font/woff" crossorigin="anonymous" /> <?php
	endforeach;
  echo PHP_EOL ?>
  <!-- other preload --> <?php
  echo PHP_EOL;
  if ( $preload ) {
    foreach ( $preload as $item ) {
      create_link_preload( $item );
    }
    unset( $item );
  } ?>
  <!-- favicons -->
  <link rel="apple-touch-icon" sizes="180x180" href="<?php echo $site_url ?>/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="<?php echo $site_url ?>/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="<?php echo $site_url ?>/favicon-16x16.png">
  <link rel="manifest" href="<?php echo $site_url ?>/site.webmanifest">
  <link rel="mask-icon" href="<?php echo $site_url ?>/safari-pinned-tab.svg" color="#5bbad5">
  <meta name="msapplication-TileColor" content="#191919">
  <meta name="theme-color" content="#ffffff"> <?php
  echo PHP_EOL;
  wp_head() ?>
</head>

<body <?php body_class() ?>> <?php
  wp_body_open() ?>
  <noscript>
    <!-- <noindex> -->Для полноценного использования сайта включите JavaScript в настройках вашего браузера.
    <!-- </noindex> -->
  </noscript>
  <div id="page-wrapper">
    <header class="hdr container sect-underline">
      <div class="hdr__inner">
        <img src="<?php echo $logo_url ?>" alt="Logo" width="66" height="36" data-scroll-target="0" class="hdr__logo-img"> <?php
        wp_nav_menu( [
          'theme_location'  => 'header_menu',
          'container'       => 'nav',
          'container_class' => 'hdr__nav',
          'menu_class'      => 'hdr__nav-list',
          'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
        ] ) ?>
        <button type="button" class="hdr__burger"></button>
      </div> <?php
      require 'template-parts/mobile-menu.php' ?>
    </header>