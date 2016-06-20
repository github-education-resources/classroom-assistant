"use strict"

const React = require('react')
const Window = require('react-photonkit').Window

var App = React.createClass({
  render: () => {
    return (
      <Window>
        <h1>Hello World!</h1>
      </Window>
    )
  }
})

module.exports = App
