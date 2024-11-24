<?php
/**
 * This is the main template file and 
 * the default app wrapper for all views.
 * React router will serve the appropriate content
 * 
 * @package WordPress
 * @package 2B One
 * @since 2B One 2.0
 */
 ?>
<!DOCTYPE html>

<html <?php language_attributes(); ?> class="no-js">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

    <!-- Let WordPress set Initial Page Title -->
    <title>
        <?php
            if (function_exists('is_tag') && is_tag()) { echo 'Tag Archive for &quot;' . esc_html($tag) . '&quot; - '; }
            elseif (is_archive()) { wp_title(''); echo ' Archive - '; }
            elseif (is_search()) { echo 'Search for &quot;' . esc_html(get_search_query()) . '&quot; - '; }
            elseif (!(is_404()) && (is_single()) || (is_page())) { wp_title(''); echo ' - '; }
            elseif (is_404()) { echo 'Not Found - '; }
            bloginfo('name'); 
        ?>
    </title>

    <meta name="description" content="New Blog"/>
    <meta name="keywords" content=""/>
    <meta name="author" content="2B One"/>
    <meta name="robots" content="index, follow"/>

    <!-- <meta name="revisit-after" content="3 month"/>
    <meta name="googlebot" content="noodp"/>
    <meta name="google" content="nositelinkssearchbox"/>
    <meta name="google" content="notranslate"/>
    <meta name="google" content="noimageindex"/>
    <meta name="google" content="noarchive"/>
    <meta name="google" content="nosnippet"/> -->

    <!-- <meta name="HandheldFriendly" content="True"/>
    <meta name="MobileOptimized" content="320"/>
    <meta name="theme-color" content="#000000"/>
    <meta name="mobile-web-app-capable" content="yes">

    <meta name="msapplication-TileColor" content="#000000"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
    <meta name="apple-mobile-web-app-title" content="2B One"/>
    <meta name="application-name" content="2B One"/> -->

    <link rel="profile" href="http://shaunknowles.uk" />

    <!--
    <meta name="msapplication-TileImage" content="favicon/ms-icon-144x144.png"/>
    <meta name="msapplication-square70x70logo" content="favicon/ms-icon-70x70.png"/>
    <meta name="msapplication-square150x150logo" content="favicon/ms-icon-150x150.png"/>
    <meta name="msapplication-wide310x150logo" content="favicon/ms-icon-310x150.png"/>
    <meta name="msapplication-square310x310logo" content="favicon/ms-icon-310x310.png"/>
    <link rel="apple-touch-icon" sizes="57x57" href="favicon/apple-icon-57x57.png"/>
    <link rel="apple-touch-icon" sizes="60x60" href="favicon/apple-icon-60x60.png"/>
    <link rel="apple-touch-icon" sizes="72x72" href="favicon/apple-icon-72x72.png"/>
    <link rel="apple-touch-icon" sizes="76x76" href="favicon/apple-icon-76x76.png"/>
    <link rel="apple-touch-icon" sizes="114x114" href="favicon/apple-icon-114x114.png"/>
    <link rel="apple-touch-icon" sizes="120x120" href="favicon/apple-icon-120x120.png"/>
    <link rel="apple-touch-icon" sizes="144x144" href="favicon/apple-icon-144x144.png"/>
    <link rel="apple-touch-icon" sizes="152x152" href="favicon/apple-icon-152x152.png"/>
    <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-icon-180x180.png"/>
    <link rel="icon" type="image/png" sizes="192x192"  href="favicon/android-icon-192x192.png"/>
    <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png"/>
    <link rel="icon" type="image/png" sizes="96x96" href="favicon/favicon-96x96.png"/>
    <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png"/>
    <link rel="manifest" href="favicon/manifest.json"/>
    <link rel="mask-icon" href="favicon/safari-pinned-tab.svg" color="#5bbad5"/>
    <link rel="shortcut icon" href="favicon/favicon.ico"/>
    -->


    <!-- Always have wp_head() just before the closing </head> plugins use this hook to add stuff -->
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?> >
    <div id="root">
        <style>
            p {
                padding: 6vmin;
                color: lightslategray;
                font-size: 18px;
                font-weight: bold;
                font-style: italic;
                text-align: center;
                letter-spacing: 1px;
            }
            .loader {
                --color: darkslategray;
                --size-dot: 15px;
                display: block;
                position: relative;
                width: 50%;
                margin: calc(100vh/4) auto 0;
                role: alert;
            }
            .loader::before,
            .loader::after {
                content: '';
                box-sizing: border-box;
                position: absolute;
                width: var(--size-dot);
                height: var(--size-dot);
                background-color: var(--color);
                border-radius: 50%;
                animation: loading 1.2s ease-in-out infinite;
            }
            .loader::before { left: calc(50% - 1.6vmin - var(--size-dot)); }
            .loader::after {
                left: calc(50% + 1.6vmin);
                animation-delay: -0.4s;
            }
            @keyframes loading {
                0%, 100% { transform: translateY(-3.6vmin); opacity: 1; }
                44% { transform: translateY(3.6vmin); opacity: 0.3; }
            }
        
        </style>
        <div id="content">
            <div class="loader"></div>
            <p>processing</p>
        </div>
    </div>
    <?php wp_footer(); ?>
</body>
</html>