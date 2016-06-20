"use strict"

const React = require("react")
const {Window, Toolbar, Content} = require("react-photonkit")

var App = React.createClass({
  render: () => {
    return (
      <Window>
        <Toolbar title='Classroom Desktop'/>
          <Content />
        <Toolbar psType='footer' title='Classroom Desktop'/>
      </Window>
    )
  }
})

module.exports = App
