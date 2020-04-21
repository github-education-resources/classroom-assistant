const rules = require("./webpack.rules");

rules.push(
  {
    test: /\.(scss|sass)$/,
    exclude: /node_modules/,
    loaders: [
      {
        loader: "style-loader",
      },
      {
        loader: "css-loader",
      },
      {
        loader: "sass-loader",
      },
    ],
  },
  {
    test: /\.css$/i, // regex to select only .css files
    use: [
      {
        loader: "style-loader",
      },
      {
        loader: "css-loader",
      },
    ],
  }, // the sass-loader converts the sass into css, the css-loader puts that css into the JS, the style-loader puts the javascript into the DOM.
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: "url-loader?limit=10000&mimetype=application/font-woff",
  },
  {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: "file-loader",
  },
  {
    test: /\.(png|jpg|gif)$/,
    loader: "url-loader?limit=25000",
  },
  {
    test: /\.jsx$/,
    use: [
      {
        loader: "babel-loader",
        options: {
          presets: ["@babel/env", "@babel/react"],
          plugins: ["@babel/plugin-transform-runtime"],
        },
      },
    ],
  }
);

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".scss", ".json"],
    modules: ["node_modules"],
  },
};
