const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: "./src/index.jsx"
  },
  output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
		//themePath: "C:\\wamp64\\www\\wp\\wp-content\\themes\\n2bone\\",
		//themeDist: themePath + "dist\\",
  },
  optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: false,
				extractComments: 'all',
				uglifyOptions: {
					compress: true,
					output: null
				}
			}),
			new OptimizeCSSAssetsPlugin({
				cssProcessorOptions: {
					safe: true,
					discardComments: {
						removeAll: true,
					},
				},
			})
		]
  },
  plugins: [
		new webpack.ContextReplacementPlugin(/\.\/locale$/, 'empty-module', false, /jsx$/),
		new webpack.LoaderOptionsPlugin({
			options: {
				debug: false
			}
		}),
		new MiniCssExtractPlugin({
			//filename: "[name].css",
			filename: "style.css",
			chunkFilename: "[id].css"
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			Popper: ['popper.js', 'default']
		}),
		new CompressionPlugin({
			test: /\.(js|css)/
		}),
		new UglifyJsPlugin(),
		new CopyPlugin([
			//{ from: '.public\', to: themePath },
			//{ from: '.dist\', to: themeDist },

			{ from: 'public/', to:  'C:/wamp64/www/wp/wp-content/themes/nice2bone/'},
			{ from: 'dist/', to: 'C:/wamp64/www/wp/wp-content/themes/nice2bone/dist/'},
    ]),
		new WebpackShellPlugin({
			onBuildStart: ['echo "Webpack Start"'],
      //onBuildEnd: ['postcss --dir wwwroot/dist wwwroot/dist/*.css','echo "Webpack End"']
      onBuildEnd: ['echo "Webpack End"']
		})
	],
  module: {
    rules: [
      {
				test: /\.scss$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						//options: {
						//	minimize: true,
						//	sourceMap: true
						//}
					},
					{
						loader: "sass-loader"
					}
				]
			},
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "file-loader?name=[name].[ext]&outputPath=images/&publicPath=https://nice2b.me/wp-content/themes/nice2bone/dist/images",
          "image-webpack-loader"
        ]
      },
      {
        test: /\.(woff2?|svg)$/,
        loader: "url-loader?limit=10000&name=fonts/[name].[ext]"
      },
      {
        test: /\.(ttf|eot)$/,
        loader: "file-loader?name=fonts/[name].[ext]"
      }
    ]
	},
  resolve: {
    extensions: [".js", ".jsx"],
		modules: [
      path.resolve('./dist/app'),
      //path.resolve('./dist/js/App'),
			//path.resolve('./React/js/App/Modules/Client'),
			path.resolve('./node_modules')
		]
	},
  watch: false
};
