const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development', // Development or Production режим
  devtool: 'inline-source-map', // Включаем отображение Source Map
  entry: './src/index.ts', // Точка входа
  output: {
    filename: 'bundle.js', // Выходной файл
    path: path.resolve(__dirname, 'dist'), // Куда выводить собранные файлы
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
      },
      // Правило для SCSS и CSS
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      // Определяем правило для загрузки изображений
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext][query]'
        }
      },
      // Подключаем шрифтовые файлы
      {
        test: /\\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },
    stats: {
    children: true, // This will show detailed stats for child compilations
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.pug', // Использовать Pug в качестве шаблона
    }),
    new MiniCssExtractPlugin({
      filename: './style.css'
    }),
  ],
  devServer: {
    static: './dist', // Где лежит рабочий сайт
    open: true, // Открывать автоматически браузер
    hot: true // Горячая перегрузка
  }
};