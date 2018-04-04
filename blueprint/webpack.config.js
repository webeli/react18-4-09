module.exports = {
	entry: __dirname + '/src',
	output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
	},
	module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
				loader: 'babel-loader'
			}
    ]
  },
};