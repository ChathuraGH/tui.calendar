/* eslint-disable */
const postcssPrefixer = require('postcss-prefixer');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const merge = require('webpack-merge');
const common = require('./webpack.common.config');

module.exports = (env, argv) => {
  const prefix = 'toastui-calendar-';
  const config = {
    mode: 'development',
    entry: ['./src/sass/index.scss', './src/index.ts'],
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js)$/,
          exclude: /node_modules/,
          loader: ['babel-loader', 'eslint-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: { plugins: [postcssPrefixer({ prefix })] },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(gif|png|jpe?g)$/,
          use: 'url-loader',
        },
      ],
    },
    plugins: [new StyleLintPlugin()],
    devtool: 'inline-source-map',
    devServer: {
      historyApiFallback: false,
      host: '0.0.0.0',
      disableHostCheck: true,
    },
  };

  return merge(common(env, argv), config);
};
