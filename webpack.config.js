import path from "path"
import { fileURLToPath } from "url"
import webpack from "webpack";
import dotenvx from "@dotenvx/dotenvx";


import MiniCssExtractPlugin from "mini-css-extract-plugin"
// --> extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.
import CssMinimizerPlugin from "css-minimizer-webpack-plugin"
// --> uses cssnano to optimize and minify your CSS.
import CompressionPlugin from "compression-webpack-plugin"
// --> prepare compressed versions of assets to serve them with Content-Encoding.
import TerserPlugin from "terser-webpack-plugin"
// --> use terser to minify/minimize your JavaScript.
import CopyPlugin from "copy-webpack-plugin"
// --> copies individual files or entire directories, which already exist, to the build directory.
import WebpackShellPlugin from "webpack-shell-plugin-next"
// --> allows you to run any shell commands before or after webpack builds. 


// ESM-friendly __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load and parse .env
const env = dotenvx.config().parsed || {};

// Prepare DefinePlugin-compatible env variables
const envKeys = Object.entries(env).reduce((acc, [key, val]) => {
  acc[`process.env.${key}`] = JSON.stringify(val);
  return acc;
}, {});

const devMode = process.env.NODE_ENV !== "production"
//const devMode = false;

export default {
  mode: "production",
  entry: {
    app: "./src/index.jsx",
  },
  output: {
    // hashFunction: "sha256",
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    // filename: '[name].[hash:8].js',
    // sourceMapFilename: '[name].[hash:8].map',
    // chunkFilename: '[id].[hash:8].js'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: "all",
        terserOptions: {
          compress: true,
          output: {
            comments: false,
          },
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
    new webpack.DefinePlugin(envKeys),
    new webpack.ContextReplacementPlugin(
      /\.\/locale$/,
      "empty-module",
      false,
      /jsx$/
    ),
    new MiniCssExtractPlugin({
      //filename: "[name].css",
      filename: "style.css",
      chunkFilename: "[id].css",
    }),

    new CopyPlugin({
      patterns: [
        {
          from: "public/",
          to: process.env.VITE_LOCAL_WP_THEME_DIR,
          noErrorOnMissing: true,
        },
        {
          from: "dist/",
          to: path.join(process.env.VITE_LOCAL_WP_THEME_DIR, "dist"),
          noErrorOnMissing: true,
        },
      ],
    }),
    new WebpackShellPlugin({
      onBuildStart: {
        scripts: ['echo "===> Webpack 5 Start"'],
        blocking: true,
        parallel: false,
      },
      onBuildEnd: {
        scripts: ['echo "Webpack End"'],
        blocking: false,
        parallel: true,
      },
      //// onBuildEnd: ['postcss --dir wwwroot/dist wwwroot/dist/*.css','echo "Webpack End"']
    }),
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
        test: /\.(jpe?g|png|gif|svg|webp|avif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/",
              publicPath:
                "https://nice2b.me/wp-content/themes/nice2bone/dist/images",
            },
          },
          "image-webpack-loader",
        ],
      },
      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]',
        },
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


// process.traceDeprecation = true;
// TRACE DEPRECIATED
