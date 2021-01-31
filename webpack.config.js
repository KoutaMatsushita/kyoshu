const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = (env, argv) => {
  const config = {
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    devtool: process.env.NODE_ENV === "production" ? "source-map" : "eval-source-map",
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.[fullhash].js",
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/react"],
              },
            },
            {
              loader: "ts-loader",
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".cjs", ".ts", ".tsx"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "kyoshu",
        meta: [
          { viewport: "width=device-width, initial-scale=1" },
          { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
        ],
      }),
      new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }),
    ],
    devServer: {
      historyApiFallback: true,
    },
  };
  if (argv.analyze) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }
  return config;
};
