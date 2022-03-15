<?php

// Globals
/**
 * @var (string) $version css and js version
*/
$version = '1.0.0';
$template_directory_uri = get_template_directory_uri();
$template_directory = get_template_directory();
$site_url = site_url();
$screen_widths = ['0', '576', '768', '1024', '1280'];

$upload_dir = wp_get_upload_dir();

$svg_icons = [
  'rhombus' => <<<END
  <svg viewBox="0 0 91 61" xmlns="http://www.w3.org/2000/svg" class="rhombus-svg lazyanimation">
    <path d="m31.096 30.334 29.57-25.627 29.57 25.627-29.57 25.628-29.57-25.628Z" class="rhombus-svg__path"/>
    <path d="m20.985 30.334 29.57-25.627 29.57 25.627-29.57 25.628-29.57-25.628Z" class="rhombus-svg__path"/>
    <path d="m10.873 30.334 29.57-25.627 29.571 25.627-29.57 25.628-29.57-25.628Z" class="rhombus-svg__path"/>
    <path d="m.763 30.334 29.57-25.628 29.571 25.628-29.57 25.627L.764 30.334Z" class="rhombus-svg__path"/>
    </svg>
  END,
  'triangle' => <<<END
  <svg viewBox="0 0 72 59" xmlns="http://www.w3.org/2000/svg" class="triangle-svg lazyanimation">
    <path d="M.613 58.032 2.785 1.2l43.687 36.413L.612 58.032Z" class="triangle-svg__path"/>
    <path d="M8.876 58.032 11.048 1.2l43.687 36.413L8.876 58.032Z" class="triangle-svg__path"/>
    <path d="M17.14 58.032 19.31 1.2l43.687 36.413L17.14 58.032Z" class="triangle-svg__path"/>
    <path d="M25.403 58.032 27.575 1.2l43.687 36.414-45.86 20.418Z" class="triangle-svg__path"/>
  </svg>
  END,
  'ellipse' => <<<END
  <svg viewBox="0 0 74 63" xmlns="http://www.w3.org/2000/svg" class="ellipse-svg lazyanimation">
    <path d="M31.545 31.668c0 8.497-1.781 16.165-4.637 21.69-2.87 5.552-6.744 8.81-10.886 8.81-4.141 0-8.016-3.258-10.885-8.81C2.281 47.834.5 40.166.5 31.669c0-8.497 1.781-16.165 4.637-21.69 2.869-5.552 6.744-8.81 10.886-8.81 4.141 0 8.016 3.258 10.885 8.81 2.856 5.525 4.637 13.193 4.637 21.69Z" class="ellipse-svg__path"/>
    <path d="M41.994 31.668c0 8.497-1.78 16.165-4.637 21.69-2.869 5.552-6.743 8.81-10.885 8.81-4.142 0-8.017-3.258-10.886-8.81-2.855-5.525-4.636-13.193-4.636-21.69 0-8.497 1.78-16.165 4.636-21.69 2.87-5.552 6.744-8.81 10.886-8.81 4.142 0 8.016 3.258 10.885 8.81 2.856 5.525 4.637 13.193 4.637 21.69Z" class="ellipse-svg__path"/>
    <path d="M52.444 31.668c0 8.497-1.781 16.165-4.637 21.69-2.87 5.552-6.744 8.81-10.886 8.81-4.141 0-8.016-3.258-10.885-8.81-2.856-5.525-4.637-13.193-4.637-21.69 0-8.497 1.781-16.165 4.637-21.69 2.869-5.552 6.744-8.81 10.885-8.81 4.142 0 8.017 3.258 10.886 8.81 2.856 5.525 4.637 13.193 4.637 21.69Z" class="ellipse-svg__path"/>
    <path d="M62.893 31.668c0 8.497-1.78 16.165-4.637 21.69-2.869 5.552-6.743 8.81-10.885 8.81-4.142 0-8.017-3.258-10.886-8.81-2.855-5.525-4.637-13.193-4.637-21.69 0-8.497 1.782-16.165 4.637-21.69 2.87-5.552 6.744-8.81 10.886-8.81 4.142 0 8.016 3.258 10.885 8.81 2.856 5.525 4.637 13.193 4.637 21.69Z" class="ellipse-svg__path"/>
    <path d="M73.343 31.668c0 8.497-1.781 16.165-4.637 21.69-2.87 5.552-6.744 8.81-10.886 8.81-4.141 0-8.016-3.258-10.885-8.81-2.856-5.525-4.637-13.193-4.637-21.69 0-8.497 1.781-16.165 4.637-21.69 2.869-5.552 6.744-8.81 10.885-8.81 4.142 0 8.017 3.258 10.886 8.81 2.856 5.525 4.637 13.193 4.637 21.69Z" class="ellipse-svg__path"/>
  </svg>
  END
];

/**
 * @var (string) $upload_basedir /public_html/wp-content/uploads/
*/
$upload_basedir = $upload_dir['basedir'] . DIRECTORY_SEPARATOR;

/**
 * @var (string) $upload_baseurl http://site.com/wp-content/uploads/
 */
$upload_baseurl = $upload_dir['baseurl'] . DIRECTORY_SEPARATOR;

$tel_regex = '/\s/';
$address = get_option( 'contacts_address' );
$address_link = get_option( 'contacts_address_link' );
$tel = get_option( 'contacts_tel' );
$tel_clean = preg_replace( $tel_regex, '', $tel );
$email = get_option( 'contacts_email' );
$instagram = get_option( 'contacts_instagram' );
$facebook = get_option( 'contacts_facebook' );

$logo_id = get_theme_mod( 'custom_logo' );
$logo_url = wp_get_attachment_url( $logo_id );

/**
 * @var (bool) $webp_support
 * true if browser support the WebP image format
 */
$webp_support = strpos( $_SERVER['HTTP_ACCEPT'], 'image/webp' ) !== false || strpos( $_SERVER['HTTP_USER_AGENT'], ' Chrome/' ) !== false;
require $template_directory . '/inc/render-wp-blocks.php';


require $template_directory . '/inc/create-case-content.php';

// create teammate card
require $template_directory . '/inc/create-teammate-card.php';

// Create case card
require $template_directory . '/inc/create-case-card.php';

// Создание <link rel="preload" /> для img
require $template_directory . '/inc/create-link-preload.php';

// Активация SVG и WebP в админке
require $template_directory . '/inc/enable-svg-and-webp.php';

// Регистрация стилей и скриптов для страниц и прочие манипуляции с ними
require $template_directory . '/inc/enqueue-styles-and-scripts.php';

// Отключение стандартных скриптов и стилей, гутенберга, emoji и т.п.
require $template_directory . '/inc/disable-wp-scripts-and-styles.php';

// Регистрация меню на сайте
require $template_directory . '/inc/menus.php';

// Регистрация доп. полей в меню Настройки->Общее
require $template_directory . '/inc/options-fields.php';

// Регистрация и изменение записей и таксономий
require $template_directory . '/inc/register-custom-posts-types-and-taxonomies.php';

// Нужные поддержки темой, рамзеры для нарезки изображений
require $template_directory . '/inc/theme-support-and-thumbnails.php';

// Склеивание путей с правильным сепаратором
require $template_directory . '/inc/php-path-join.php';

// Определение шаблона страницы
require $template_directory . '/inc/define-template.php';

// Отключение обновления плагинов
require $template_directory . '/inc/disable-refresh-plugins.php';

// Передача в JS переменных с url и path сайта
require $template_directory . '/inc/print-site-data-js.php';


/**
 * Components
 */
require $template_directory . '/components/case.php';
require $template_directory . '/components/cases-block.php';
require $template_directory . '/components/contact-block.php';

if ( is_super_admin() || is_admin_bar_showing() ) {

	// Функция формирования стилей и скриптов для страницы при сохранении страницы
	require $template_directory . '/inc/build-styles-scripts.php';

	// Функция создания webp и минификации изображений
	require $template_directory . '/inc/generate-images.php';

	// Формирование файла pages-info.json, для понимания на какой странице какие секции используются
	require $template_directory . '/inc/build-pages-info.php';

	// Удаление лишних пунктов из меню админ-панели и прочие настройки админ-панели
	require $template_directory . '/inc/admin-menu-actions.php';

}