"use strict"

const {hashHistory, Route, Router} = require("react-router")
const React = require("react")

const App = require("./components/app")

module.exports = (
  <Router history={hashHistory}>
    <Route path='/' component={App}/>
  </Router>
)
