var path = require('path');
console.log(__dirname);
module.exports = {
  entry: './src/client.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist/'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
      rules: [
        {
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
            exclude: /(node_modules)/
        }
    ]
  },
  // plugins: [
  //   new LoaderOptionsPlugin({
  //       options: {
  //           tslint: {
  //               tsConfigFile: 'tsconfig.json'
  //           }
  //       }
  //   })
  // ]

};
