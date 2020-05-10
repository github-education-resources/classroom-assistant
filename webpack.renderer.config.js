const fs = require("fs-extra")
const path = require("path")
const rules = require("./webpack.rules")
const webpack = require("webpack")
const getReplacements = require("./app-info")
const replacements = getReplacements()

const isDev = process.env.NODE_ENV === "development"

const AfterDonePlugin = function (calllback) {
  this.apply = function (compiler) {
    const runAfter = () => {
      calllback()
    }

    const webpackTap =
      compiler.hooks &&
      compiler.hooks.done &&
      compiler.hooks.done.tap.bind(compiler.hooks.done)

    if (webpackTap) {
      webpackTap("WebpackAfterDonePlugin", runAfter)
    } else {
      compiler.plugin("done", runAfter)
    }
  }
}

const plugins = [
  new webpack.DefinePlugin(
    Object.assign({}, replacements, {
      __PROCESS_KIND__: JSON.stringify("renderer"),
    })
  ),
]
// In development we don't need to copy because we use the node_modules version of dugite
if (!isDev) {
  plugins.push(new AfterDonePlugin((logger) => {
    const gitDir = ".webpack/git"
    fs.removeSync(gitDir)
    fs.mkdirpSync(gitDir)
    fs.copySync(path.resolve(__dirname, "node_modules/dugite/git"), gitDir, { recursive: true })
  }))
}

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
        loader: "sass-loader", // the sass-loader converts the sass into css, the css-loader puts that css into the JS, the style-loader puts the javascript into the DOM.
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
  },
  // Needed for font-awesome
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: "url-loader?limit=10000000&mimetype=application/font-woff",
  },
  {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: "file-loader",
  },
  {
    test: /\.(png|jpg|gif)$/,
    // loader: "file-loader",
    loader: "url-loader?limit=1000000",
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
)

module.exports = {
  module: {
    rules,
  },
  node: {
    __dirname: isDev,
  },
  resolve: {
    extensions: [".js", ".jsx", ".css", ".scss", ".json"],
    modules: ["node_modules"],
  },
  plugins: plugins,
}
