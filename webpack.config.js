const config = {
  entry: './client/app.js',

  output: {
    path: './client/',
    filename: 'index.js',
  },

  devServer: {
    inline: true,
    port: 3000,
    contentBase: './client',
    hot: true,
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',

        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
};

module.exports = config;
