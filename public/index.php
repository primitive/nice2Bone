<?php
/**
 * This is the main template file.
 * The default app wrapper for all views.
 * React router will serve the appropriate content
 * 
 * @package WordPress
 * @package Nice2B One
 * @since Nice2B One 1.0
 */
 ?>
 <!DOCTYPE html>

 <html <?php language_attributes(); ?> class="no-js">
    <head>
        <meta charset="<?php bloginfo( 'charset' ); ?>">
        <!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <!-- Mobile IE allows us to activate ClearType technology for smoothing fonts for easy reading -->
        <meta http-equiv="cleartype" content="on">

        <!-- Responsive and mobile friendly stuff -->
        <meta name="HandheldFriendly" content="True">
        <meta name="MobileOptimized" content="320">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
        <!-- Let WordPress set Initial Page Title -->
        <title>
            <?php
            if (function_exists('is_tag') && is_tag()) { echo 'Tag Archive for &quot;'.$tag.'&quot; - '; } 
            elseif (is_archive()) { wp_title(''); echo ' Archive - '; } 
            elseif (is_search()) { echo 'Search for &quot;'.wp_specialchars($s).'&quot; - '; }
            elseif (!(is_404()) && (is_single()) || (is_page())) { wp_title(''); echo ' - '; }
            elseif (is_404()) { echo 'Not Found - '; }
            bloginfo('name'); 
            ?>
        </title>
        <!-- Always have wp_head() just before the closing </head>
            * tag of your theme, or you will break many plugins, which
            * generally use this hook to add elements to <head> such
            * as styles, scripts, and meta tags.
        -->
        <?php wp_head(); ?>
    </head>
    <body <?php body_class(); ?> >
        <div id="root">
            <div id="content">
                <div class="loader-gif">
                    <img src="<?php echo home_url() ?>/wp-content/themes/nice2bone/dist/images/loading-icon.gif" alt="Brain is Loading...">
                </div>
            </div>
        </div>
        <?php wp_footer(); ?>
    </body>
</html>