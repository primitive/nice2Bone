# Nice2b One Theme
A WordPress REST API based blog theme.
Theme Created with Node.js, React 16, Bootstrap 4 and Webpack 4.


# TO DO
1. Optimise FontAwsome and Google Fonts use
2. Refine: titles / meta handling
3. Fix: 404 handling for CPT
4. Add: WP theme support and user configurables


![screenshot](public/screenshot.jpg)

### Setup
-----

The following pre-requisites should be in place for the theme to work:

1. WordPress version 6.0 or later
2. Posts permalink set set to: Custom Structure - `/posts/%postname%/`

3. ACF and CPT Plugins Installed
4. WP REST Filter and WP REST Cache Plugins Installed

5. Create a CPT with permalink to be set as: Custom base i.e. - `/jokes/`

### Installing and beginning development
------------------------------------

1. `git clone https://github.com/primitive/nice2bone`
2. `cd nice2bone`
3. `npm install`
4. `npm run build` or webpack --mode=development
5. In the WordPress Admin Dashboard go to Appearances > Themes and Activate `Nice2B One`

The code is opensource so continue to play, develop or break the theme as you see fit.

Enjoy!


### Release History

1.0.9
Upgrade Webpack to V5
Maintenance

1.0.8
Add: tags support 

1.0.7
Add: ACF / Custom post type support
Add: ACF / Custom taxonomies support


# Stable Release (May 15, 2019):
1. Added: Google analytics
2. Added: title sync 
3. Added: 404 handling and preloaders for pages, posts and categories

# Beta Release (April 01, 2019):
1. Beta version, supports posts, pages and categories


## Support
-------

If you find any problems with this theme, please report an issue at:
(https://github.com/primitiveshaun/nice2bone/issues).

