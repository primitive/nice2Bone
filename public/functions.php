<?php
 /**
 * Nice 2B One theme functions
 * A 'Common or Garden' WordPress functions.php file.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage 2B One
 * @since Nice 2B One 2.0
 */

/*-----------------------------------------------------------------------------------*/
/* STYLES AND SCRIPTS */
/*-----------------------------------------------------------------------------------*/

function primitive_scripts() {

	// Load stylesheets.
	wp_enqueue_style('bootstrap-css', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
	wp_enqueue_style('font-awesome-css', 'https://use.fontawesome.com/releases/v5.7.2/css/all.css');
	wp_enqueue_style('primitive-style', get_stylesheet_uri());

	// Load scripts.
	wp_enqueue_script('jquery', 'https://code.jquery.com/jquery-3.3.1.slim.min.js', array('jquery'), '', true);
	wp_enqueue_script('bootstrap-5', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js', array('jquery'), '', true);
	wp_enqueue_script('scrollmagic', 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.8/ScrollMagic.min.js', array('jquery'), '1.0', false);
	wp_enqueue_script('primitive-script', get_stylesheet_directory_uri() . '/dist/app.js', array(), '1.0', true);

	$mode = 'local';

	//$url = trailingslashit(home_url());
	$url = "https://nice2b.me/";
	$path = trailingslashit(parse_url($url, PHP_URL_PATH));

	// $api_url = process.env.REACT_APP_API_URL;
	// $api_url = get_rest_url();
	// $api_url = "http://localhost:8888/n2b/wp-json/wp/v2/";

	// sk-dev: add conditional for local or production
	$api_url = $url .= "wp-json/wp/v2/";
	$bedrock_api_url = $url .= "wp-json/bedrock/v1/config";

	// echo $api_url;

	$theme_name = "Nice 2B";
	$theme_posts_title = "Posts & Articles";
	$nav_brand_link = "";

	wp_scripts()->add_data('primitive-script', 'data', sprintf(
		'var PrimitiveSettings = %s;',
		wp_json_encode(array(
			'title' => get_bloginfo('name', 'display'),
			'description' => get_bloginfo('description', 'display'),
			'path' => $path,
			'URL' => array(
				'api' => esc_url_raw($api_url),
				'root' => esc_url_raw($url),
			),
			'woo' => array(
				'url' => esc_url_raw('https://nice2b.me/wp-json/'), // hard-code URL since it needs to be HTTPS for WC REST API to work
				'consumer_key' => '',
				'consumer_secret' => ''
			),
			'theme_name' => $theme_name,
			'theme_posts_title' => $theme_posts_title,
		))
	));
}
add_action('wp_enqueue_scripts', 'primitive_scripts');

/*
* Let WordPress manage the document title.
* By adding theme support, we declare that this theme does not use a
* hard-coded <title> tag in the document head, and expect WordPress to
* provide it for us.

add_theme_support( 'title-tag' );

function primitive_slug_setup() {
    add_theme_support( 'title-tag' );
}
add_action( 'after_setup_theme', 'primitive_slug_setup' );
*/



/*-----------------------------------------------------------------------------------*/



add_theme_support('automatic-feed-links');
add_theme_support('post-thumbnails');
add_theme_support('title-tag');
