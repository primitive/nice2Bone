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
		// Optional: enqueue your own plugin stylesheet (not currently used)
	//wp_enqueue_style('primitive-style', get_stylesheet_uri());

	// Load external scripts
	//wp_enqueue_script('jquery', 'https://code.jquery.com/jquery-3.3.1.slim.min.js', array('jquery'), '', true);
	//wp_enqueue_script('scrollmagic', 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.8/ScrollMagic.min.js', array('jquery'), '1.0', false);
	wp_enqueue_script('primitive-script', get_stylesheet_directory_uri() . '/dist/app.js', array(), '1.0', true);

	// $mode = 'local';
	// $remote_url = "https://nice2b.me/";

	// $url = trailingslashit(home_url());
	// $url = "https://nice2b.me";

	// Build dynamic JavaScript data for frontend scripts
	// $url = trailingslashit(home_url());
	// $path = trailingslashit(parse_url($url, PHP_URL_PATH));
	// $api_url = $url . "wp-json/wp/v2/";

	//$path = trailingslashit(parse_url($url, PHP_URL_PATH));

	// $api_url = process.env.REACT_APP_API_URL;
	// $api_url = get_rest_url();
	// $api_url = "http://localhost:8888/n2b/wp-json/wp/v2/";

	// sk-dev: add conditional for local or production
	// $wp_api_url = trailingslashit($url) . "wp-json/wp/v2/";
	// $bedrock_api_url = trailingslashit($url) . "wp-json/bedrock/v1/config";

	// // echo $api_url;

	// $theme_name = "Nice 2B";
	// $theme_posts_title = "Posts & Articles";
	// $nav_brand_link = "";

	// wp_scripts()->add_data('primitive-script', 'data', sprintf(
	// 	'var PrimitiveSettings = %s;',
	// 	wp_json_encode(array(
	// 		'title' => get_bloginfo('name', 'display'),
	// 		'description' => get_bloginfo('description', 'display'),
	// 		'root' => $url,
	// 		'path' => $path,
	// 		'URL' => array(
	// 			'api' => esc_url_raw($wp_api_url),
	// 			'root' => esc_url_raw($url),
	// 		),
	// 		'woo' => array(
	// 			'url' => esc_url_raw('https://nice2b.me/wp-json/'), // hard-code URL since it needs to be HTTPS for WC REST API to work
	// 			'consumer_key' => '',
	// 			'consumer_secret' => ''
	// 		),
	// 		'theme_name' => $theme_name,
	// 		'theme_posts_title' => $theme_posts_title,
	// 	))
	// ));
}
add_action('wp_enqueue_scripts', 'primitive_scripts');

