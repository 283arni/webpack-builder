const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');



const PAGES_DIR = `./src/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

module.exports = {
  mode: 'development', // Development or Production режим
  devtool: 'inline-source-map', // Включаем отображение Source Map
  entry: './src/scripts/index.ts', // Точка входа
  output: {
    filename: 'scripts/main.js', // Выходной файл
    path: path.resolve(__dirname, 'dist'), // Куда выводить собранные файлы
    clean: true,
  },
  module: {
    rules: [
      // Правила обработки TypeScript
      {
        test: /\\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      // Правило для Pug-шаблонов
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true,
        }
      },
      // Правило для SCSS и CSS
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      // Определяем правило для загрузки изображений
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext][query]'
        }
      },
      // Подключаем шрифтовые файлы
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]'
        }
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              // Options for svg-sprite-loader
              // For example, to extract the sprite into a separate file:
              extract: true,
              spriteFilename: 'sprite.svg', // Name of the generated sprite file
            },
          },
        ],
      },
    ]
  },
    stats: {
    children: true, // This will show detailed stats for child compilations
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    ...PAGES.map(page => new HtmlWebpackPlugin({
      minify: false,
      template: `${PAGES_DIR}/${page}`,
      filename: `./pages/${page.replace(/\.pug/,'.html')}`,
    })),
    new MiniCssExtractPlugin({
      filename: 'styles/main.css'
    }),
    new SpriteLoaderPlugin()
  ],
  devServer: {
    static: './dist', // Где лежит рабочий сайт
    open: ['/pages/index.html'], // Открывать овтоматически браузеавр
    hot: true, // Горячая перегрузка
    watchFiles: ['src/**/*', 'public/**/*'],
  }
};