const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");

/* Util */

const stripQuotes = (str = "") => {
  return str.replace(/['"]+/g, "");
};

function getEntryName() {
  const entry = process.argv[process.argv.length - 1];
  return stripQuotes(entry);
}

/* Webpack */

const BANNER_PATH = path.join(__dirname, getEntryName());

module.exports = {
  entry: path.resolve(ROOT_PATH, "default.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "default.js"
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass")
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "default.css"
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${BANNER_PATH}/**/*`, { nodir: true })
    })
  ]
};
