const path = require("path");
const webpack = require("webpack");
const devMode = process.env.NODE_ENV !== "production";

// process.traceDeprecation = true;
// TRACE DEPRECIATED
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const WebpackShellPlugin = require("webpack-shell-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// --> extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// --> uses cssnano to optimize and minify your CSS.
const CompressionPlugin = require("compression-webpack-plugin");
// --> prepare compressed versions of assets to serve them with Content-Encoding.
const TerserPlugin = require("terser-webpack-plugin");
// --> use terser to minify/minimize your JavaScript.
const CopyWebpackPlugin = require("copy-webpack-plugin");
// --> copies individual files or entire directories, which already exist, to the build directory.
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
// --> allows you to run any shell commands before or after webpack builds. 


module.exports = {
  mode: "production",
  entry: {
    app: "./src/index.jsx",
  },
  output: {
    hashFunction: "sha256",
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: "all",
        terserOptions: {
          compress: true,
          output: null,
        },
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          safe: true,
          discardComments: {
            removeAll: true,
          },
        },
      }),
    ],
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /\.\/locale$/,
      "empty-module",
      false,
      /jsx$/
    ),
    // new webpack.LoaderOptionsPlugin({
    //   options: {
    //     debug: false,
    //   },
    // }),
    new MiniCssExtractPlugin({
      //filename: "[name].css",
      filename: "style.css",
      chunkFilename: "[id].css",
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      Popper: ["popper.js", "default"],
    }),
    new CompressionPlugin({
      test: /\.(js|css)/,
    }),
    // new UglifyJsPlugin(),
	// new CopyWebpackPlugin({
	// 	patterns: [
	// 	  { 
  //       from: "public/",
  //       to: "wp-theme/",
  //       noErrorOnMissing: true
  //     },
	// 	  { 
  //       from: "dist/",
  //       to: "wp-theme/dist/",
  //       noErrorOnMissing: true
  //     },
	// 	],
	//   }),
	// new CopyPlugin([
	// //{ from: '.public\', to: themePath },
	// //{ from: '.dist\', to: themeDist },

	// { from: "public/", to: "D:/built" },
	// { from: "dist/", to: "D:/built/dist/" },
	// //{ from: 'public/', to:  'C:/wamp64/www/wp/wp-content/themes/nice2bone/'},
	// //{ from: 'dist/', to: 'C:/wamp64/www/wp/wp-content/themes/nice2bone/dist/'},
	// ]),
    // new WebpackShellPlugin({
    //   onBuildStart: ['echo "Webpack Start"'],
    //   //onBuildEnd: ['postcss --dir wwwroot/dist wwwroot/dist/*.css','echo "Webpack End"']
    //   onBuildEnd: ['echo "Webpack End"'],
    // }),

	new WebpackShellPluginNext({
		onBuildStart:{
		  scripts: ['echo "===> Webpack 5 Start"'],
		  blocking: true,
		  parallel: false
		},
		onBuildEnd:{
		  scripts: ['echo "Webpack End"'],
		  blocking: false,
		  parallel: true
		}
	  })
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "file-loader?name=[name].[ext]&outputPath=images/&publicPath=https://nice2b.me/wp-content/themes/nice2bone/dist/images",
          "image-webpack-loader",
        ],
      },
      {
        test: /\.(woff2?|svg)$/,
        // loader: "url-loader?limit=10000&name=fonts/[name].[ext]",
		use: [
			{
				loader: 'url-loader',
				options: {
					limit: 1000,
					name : 'fonts/[name].[ext]'
				}
			}
		]
      },
      {
        test: /\.(ttf|eot)$/,
        // loader: "file-loader?name=fonts/[name].[ext]",
		use: [
			{
				loader: 'file-loader',
				options: {
					limit: 1000,
					name : 'fonts/[name].[ext]'
				}
			}
		]
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [
      path.resolve("./dist/app"),
      //path.resolve('./dist/js/App'),
      //path.resolve('./React/js/App/Modules/Client'),
      path.resolve("./node_modules"),
    ],
  },
  watch: false,
};
