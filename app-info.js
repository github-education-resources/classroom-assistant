const s = JSON.stringify

const isDev = false // process.env.NODE_ENV === "development"

// eslint-disable-next-line space-before-function-paren
module.exports = function getReplacements() {
  return {
    __DARWIN__: process.platform === "darwin",
    __WIN32__: process.platform === "win32",
    __LINUX__: process.platform === "linux",
    __DEV__: isDev,
    __API_URL__: isDev ? "\"http://classroom.github.localhost:5000\"" : "\"https://classroom.github.com\"",
    "process.platform": s(process.platform),
    "process.env.TEST_ENV": s(process.env.TEST_ENV),
  }
}
