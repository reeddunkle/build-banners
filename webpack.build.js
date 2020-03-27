const glob = require('glob');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const webpack = require('webpack');

/* Util */

const stripQuotes = (str = '') => {
  return str.replace(/['"]+/g, '');
};

function getEntryName() {
  return stripQuotes(process.argv[2].substring(2));
}

/* Webpack */

function run() {
  const entry = getEntryName();
  // const paths = {
  //   entry: path.resolve(path.relative(__dirname, entry)),
  //   output: path.resolve(path.relative(__dirname, 'dist')),
  // };

  const config = {
    mode: 'production',
    entry: `D:\\code\\personal\\build-banners\\${entry}\\default.js`,
    output: {
      path: `D:\\code\\personal\\build-banners\\dist`,
      filename: 'default.js',
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'default.css',
      }),
      // new PurgecssPlugin({
      //   paths: glob.sync(`${BANNER_PATH}/**/*`, { nodir: true }),
      // }),
    ],
  };

  console.log('entry:', path.join(__dirname, entry));
  console.log('output:', config.output.path);
  console.log('\n');

  webpack(config, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    console.log('Done processing.');
  });
}

run();
