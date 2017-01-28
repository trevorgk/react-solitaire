const {resolve} = require('path');

module.exports = {
  entry: './src/client.ts',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, './dist/'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  watch: true,
  module: {
      rules: [
        {
            enforce: 'pre',
            test: /\.tsx?$/,
            loader: 'tslint-loader',
            include: [
              resolve(__dirname, "./src"),
            ],
        },
        {
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
            include: [
              resolve(__dirname, "./src"),
            ],
        }
    ]
  }
};
