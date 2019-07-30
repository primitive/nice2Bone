# Nice2b One Theme
A WordPress REST API based blog theme.
Theme Created with Node.js, React 16, Bootstrap 4 and Webpack 4.

Beta Release (April 01, 2019):
1. Beta version, supports posts, pages and categories

1st Release (May 15, 2019):
1. Add: Google analytics
2. Add: title sync 
3. Add: 404 handling and preloaders for pages, posts and categories

Add: tags support 
Add: ACF / Custom post type support
Add: ACF / Custom taxonomies support


To Do
1. Optimise FontAwsome and Google Fonts use
4. Add: WP theme support and user configurables
5. Fix: PHP page title


![screenshot](screenshot.jpg)

Setup
-----

The following pre-requisites should be in place for the theme to work:

1. WordPress version 5.0 or later
2. Posts permalink set set to: Custom Structure - `/posts/%postname%/`

3. ACF Plugin Installed
4. ACF Category permalink to be set as: Custom base - `/jokes/`

Installing and beginning development
------------------------------------

1. `git clone https://github.com/primitiveshaun/nice2bone`
2. `cd nice2bone`
3. `npm install`
4. `npm run build` or webpack --mode=development
5. In the WordPress Admin Dashboard go to Appearances > Themes and Activate `Nice2B One`

The code is opensource so continue to play, develop or break the theme as you see fit.

Enjoy!


Support
-------

If you find any problems with this theme, please report an issue at:
(https://github.com/primitiveshaun/nice2bone/issues).

