var path = require('path');

module.exports = {
  entry: './src/client.ts',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist/'),
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
              path.resolve(__dirname, "../src/ts"),
            ],
        },
        {
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
            include: [
              path.resolve(__dirname, "../src/ts"),
            ],
        }
    ]
  }
};
