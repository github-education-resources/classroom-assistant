const webpack = require("webpack")
const getReplacements = require("./app-info")
const replacements = getReplacements()

const isDev = process.env.NODE_ENV === "development"

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: "./app/main-process/main.js",
  module: {
    rules: require("./webpack.rules"),
  },
  node: {
    __dirname: isDev
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
  },
  plugins: [
    new webpack.DefinePlugin(
      Object.assign({}, replacements, {
        __PROCESS_KIND__: JSON.stringify("main"),
      })
    ),
  ]
}
