const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


const fs = require('fs');

const SITE_CONF = JSON.parse(fs.readFileSync('.siteconf.json'));

const theme = `./${SITE_CONF.SRC}`;


const HEAD_SCRIPTS = env => {
  return {
    mode: env === 'build' ? 'production' : 'development',
    entry: theme + '/js/dev/DOM/index.js',
    output: {
      path: path.resolve(theme, 'js'),
      filename: 'head.min.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-transform-shorthand-properties']
            }
          }
        },
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  url: false,
                  sourceMap: true
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: [autoprefixer({ grid: true })],
                  sourceMap: true
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          })
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg|otf|png)$/,
          loader: 'file-loader',
          options: {
            name: '../[path][name].[ext]',
            context: theme + '/'
          }
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: '../css/head.min.css'
      }),
      env === 'build' ?
        new OptimizeCssAssetsPlugin({
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
          canPrint: true
        }) : { apply: () => { } }
    ],
    devtool: env === 'build' ? false : 'source-map',
    watch: !(env === 'build')
  }
};




const SCRIPTS = env => {
  return {
    mode: env === 'build' ? 'production' : 'development',
    entry: theme + '/js/dev/index.js',
    output: {
      path: path.resolve(theme, 'js'),
      filename: 'main.min.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-transform-shorthand-properties']
            }
          }
        },
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [

              {
                loader: 'css-loader',
                options: {
                  url: false,
                  sourceMap: true
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: [autoprefixer({ grid: true })],
                  sourceMap: true
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          })
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg|otf|png)$/,
          loader: 'file-loader',
          options: {
            name: '../[path][name].[ext]',
            context: theme + '/'
          }
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: '../css/main.min.css'
      }),
      env === 'build' ?
        new OptimizeCssAssetsPlugin({
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
          canPrint: true
        }) : { apply: () => { } }
    ],
    devtool: env === 'build' ? false : 'source-map',
    watch: !(env === 'build')
  }

};


module.exports = [HEAD_SCRIPTS, SCRIPTS];



