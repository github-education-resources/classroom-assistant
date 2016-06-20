"use strict"

const React = require("react")
const {hashHistory, Route, Router} = require("react-router")

const App = require("./components/app")

module.exports = (
  <Router history={hashHistory}>
    <Route path='/' component={App}/>
  </Router>
)
