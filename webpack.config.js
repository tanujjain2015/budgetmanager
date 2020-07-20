const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 8080
  },
    entry: {
        app: "./public/js/index.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/public"
  },
  module: {
    rules: [
      {
        test: /\.png$/i,
        use: [
            {
              loader: "file-loader",
              options: {
                esModule: false,
                name (file) {
                  return "[path][name].[ext]"
                },
                publicPath: function(url) {
                    return url.replace("../", "/public/")
                }
              }  
            },
            {
                loader: 'image-webpack-loader'
            }
          ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: "static", // the report outputs to an HTML file in the dist folder
      }),
      new WebpackPwaManifest({
        name: "Budget Manager",
        short_name: "BudgetManager",
        description: "An app that allows you to track your budget.",
        background_color: "#01579b",
        theme_color: "#ffffff",
        fingerprints: false,
        inject: false,
        icons: [{
          src: path.resolve("public/icons/icon-512x512.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join("public", "icons")
        }]
      })
  ],
  mode: 'development'
};