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
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
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