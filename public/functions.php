<?php

/**
 * A 'Common or Garden' WordPress functions.php file.
 * @since Nice2B One 1.0
 */

/*-----------------------------------------------------------------------------------*/
/* STYLES AND SCRIPTS */
/*-----------------------------------------------------------------------------------*/

function primitive_scripts()
{

	// Load stylesheets.
	wp_enqueue_style('bootstrap-css', 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css');
	wp_enqueue_style('font-awesome-css', 'https://use.fontawesome.com/releases/v5.7.2/css/all.css');
	//wp_enqueue_style( 'primitive-style-dist', get_stylesheet_directory_uri() . '/dist/style.css');
	wp_enqueue_style('primitive-style', get_stylesheet_uri());
	wp_enqueue_style('primitive-fonts', 'https://fonts.googleapis.com/css?family=Open+San|Allura|Bowlby+One+SC|Lobster|Lato|Roboto+Condensed|Playfair+Display:400,900&display=swap', false);

	// Load scripts.
	wp_enqueue_script('jquery', 'https://code.jquery.com/jquery-3.3.1.slim.min.js', array('jquery'), '', true);
	wp_enqueue_script('popper', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js', array('jquery'), '', true);
	wp_enqueue_script('bootstrap-4', 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js', array('jquery'), '', true);
	wp_enqueue_script('scrollmagic', 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.6/ScrollMagic.min.js', array('jquery'), '1.0', false);

	wp_enqueue_script('primitive-script', get_stylesheet_directory_uri() . '/dist/app.js', array(), '1.0', true);

	$url = trailingslashit(home_url());
	$path = trailingslashit(parse_url($url, PHP_URL_PATH));

	wp_scripts()->add_data('primitive-script', 'data', sprintf(
		'var PrimitiveSettings = %s;',
		wp_json_encode(array(
			'title' => get_bloginfo('name', 'display'),
			'description' => get_bloginfo('description', 'display'),
			'path' => $path,
			'URL' => array(
				//'api' => esc_url_raw( get_rest_url( null, '/wp/v2/' ) ),
				'api' => esc_url_raw('https://nice2b.me/wp-json/wp/v2/'),
				'root' => esc_url_raw($url),
			),
			'woo' => array(
				'url' => esc_url_raw('https://nice2b.me/wp-json/'), // hard-code URL since it needs to be HTTPS for WC REST API to work
				'consumer_key' => '',
				'consumer_secret' => ''
			),
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

// Add various fields to the JSON output
function primitive_register_fields()
{
	// Add Author Name
	register_rest_field(
		'post',
		'author_name',
		array(
			'get_callback'		=> 'primitive_get_author_name',
			'update_callback'	=> null,
			'schema'			=> null
		)
	);
	// Add Featured Image
	register_rest_field(
		'post',
		'featured_image_src',
		array(
			'get_callback'		=> 'primitive_get_image_src',
			'update_callback'	=> null,
			'schema'			=> null
		)
	);
	// Add Published Date
	register_rest_field(
		'post',
		'published_date',
		array(
			'get_callback'		=> 'primitive_published_date',
			'update_callback'	=> null,
			'schema'			=> null
		)
	);
	// Add Category
	register_rest_field(
		'post',
		'post_category',
		array(
			'get_callback'		=> 'primitive_category',
			'update_callback'	=> null,
			'schema'			=> null
		)
	);
	// Add Category slug
	register_rest_field(
		'post',
		'post_category_slug',
		array(
			'get_callback'		=> 'primitive_category_slug',
			'update_callback'	=> null,
			'schema'			=> null
		)
	);
	// Add Category Links
	register_rest_field(
		'post',
		'post_category_link',
		array(
			'get_callback'		=> 'primitive_category_link',
			'update_callback'	=> null,
			'schema'			=> null
		)
	);
	// Add Tag
	register_rest_field(
		'post',
		'post_tag',
		array(
			'get_callback'		=> 'primitive_tag',
			'update_callback'	=> null,
			'schema'			=> null
		)
	);
	// Add Tag slug
	register_rest_field(
		'post',
		'post_tag_slug',
		array(
			'get_callback'		=> 'primitive_tag_slug',
			'update_callback'	=> null,
			'schema'			=> null
		)
	);

	// Add Header Image to Posts
	register_rest_field(
		'post',
		'post_header', // shown in the response
		array(
			'get_callback'		=> 'primitive_post_header',
			'update_callback'	=> null,
			'schema'			=> null
		)
	);
	// Add Header Image to Pages
	register_rest_field(
		'page',
		'page_header', // shown in the response
		array(
			'get_callback'		=> 'primitive_page_header',
			'update_callback'	=> null,
			'schema'			=> null
		)
	);


	// CUSTOM POST TYPES
	// Header Image for Jokes
	register_rest_field(
		'jokes',
		'joke_header',
		array(
			'get_callback'		=> 'primitive_joke_header',
			'update_callback'	=> null,
			'schema'			=> null
		)
	);


	// CUSTOM TAXONOMIES
	// Fun (Classification) Category
	register_rest_field(
		'jokes',
		'fun_category',
		array(
			'get_callback'		=> 'primitive_fun_category',
			'update_callback'	=> null,
			'schema'			=> null
		)
	);
	// Structure (Grammar/Syntax) Category
	register_rest_field(
		'jokes',
		'structure_category',
		array(
			'get_callback'		=> 'primitive_structure_category',
			'update_callback'	=> null,
			'schema'			=> null
		)
	);

	// Fun (Subject Matter) Tags
	register_rest_field(
		'jokes',
		'fun_subject',
		array(
			'get_callback'		=> 'primitive_fun_tags',
			'update_callback'	=> null,
			'schema'			=> null
		)
	);
}
add_action('rest_api_init', 'primitive_register_fields');

// ALL WordPress Fields
function primitive_get_author_name($object, $field_name, $request)
{
	return get_the_author_meta('display_name');
}
function primitive_get_image_src($object, $field_name, $request)
{
	if ($object['featured_media'] == 0) {
		return $object['featured_media'];
	}
	$feat_img_array = wp_get_attachment_image_src($object['featured_media'], 'thumbnail', true);
	return $feat_img_array[0];
}
function primitive_published_date($object, $field_name, $request)
{
	return get_the_time('F j, Y');
}
function primitive_category($object, $field_name, $request)
{
	$formatted_categories = array();
	$categories = get_the_category($object['id']);

	foreach ($categories as $category) {
		$formatted_categories[] = $category->name;
	}
	return $formatted_categories;
}
function primitive_category_slug($object, $field_name, $request)
{
	$formatted_slug = array();
	$categories = get_the_category($object['id']);

	foreach ($categories as $category) {
		$formatted_slug[] = $category->slug;
	}

	return $formatted_slug;
}
function primitive_category_link($object, $field_name, $request)
{
	$formatted_links = array();
	$categories = get_the_category($object['id']);

	foreach ($categories as $category) {
		$formatted_links[] = get_category_link($object['id']);
	}
	return $formatted_links;
}
function primitive_tag($object, $field_name, $request)
{
	$formatted_tags = array();
	$tags = get_the_tags($object['id']);

	foreach ($tags as $tag) {
		$formatted_tags[] = $tag->name;
	}
	return $formatted_tags;
}
function primitive_tag_slug($object, $field_name, $request)
{
	$formatted_tag_slug = array();
	$tags = get_the_tags($object['id']);

	foreach ($tags as $tag) {
		$formatted_tag_slug[] = $tag->slug;
	}
	return $formatted_tag_slug;
}
function primitive_tag_link($object, $field_name, $request)
{
	$formatted_tag_links = array();
	$tags = get_the_tags($object['id']);

	foreach ($tags as $tag) {
		$formatted_tag_links[] = get_tag_link($object['id']);
	}
	return $formatted_tag_links;
}

function primitive_post_header($object, $field_name, $request)
{
	// Check if ACF plugin activated
	if (function_exists('get_field')) {
		// Get the value
		if ($image = get_field('header_image', $object['id'])) :
			return get_field('header_image', $object['id']);
		endif;
	} else {
		return '';
	}
}
function primitive_page_header($object, $field_name, $request)
{
	// Check if ACF plugin activated
	if (function_exists('get_field')) {
		// Get the value
		if ($image = get_field('header_image', $object['id'])) :
			return get_field('header_image', $object['id']);
		endif;
	} else {
		return '';
	}
}
function primitive_joke_header($object, $field_name, $request)
{
	// Check if ACF plugin activated
	if (function_exists('get_field')) {
		// Get the image url
		if ($image = get_field('header_image', $object['id'])) :
			return get_field('header_image', $object['id']);
		endif;
	} else {
		return '';
	}
}


function primitive_fun_category($object, $field_name, $request)
{
	$formatted_categories = array();
	$categories = get_the_terms($object['id'], 'fun');

	foreach ($categories as $category) {
		$formatted_categories[] = $category->name;
	}
	return $formatted_categories;
}

function primitive_structure_category($object, $field_name, $request)
{
	$formatted_categories = array();
	$categories = get_the_terms($object['id'], 'structure');

	foreach ($categories as $category) {
		$formatted_categories[] = $category->name;
	}
	return $formatted_categories;
}

function primitive_fun_tags($object, $field_name, $request)
{
	$formatted_categories = array();
	$categories = get_the_terms($object['id'], 'fun_tag');

	foreach ($categories as $category) {
		$formatted_categories[] = $category->name;
	}
	return $formatted_categories;
}

function primitive_excerpt_length($length)
{
	return 25;
}

add_filter('excerpt_length', 'primitive_excerpt_length');

add_theme_support('automatic-feed-links');
add_theme_support('post-thumbnails');
