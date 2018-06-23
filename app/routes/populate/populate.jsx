import React, { Component } from "react"
import NavFooter from "../shared/components/NavFooter"

import { ipcRenderer } from "electron"

const containerStyles = {
  paddingTop: "100px"
}

class PopulatePage extends Component {
  constructor (props) {
    super(props)
    this.loadRepos = this.loadRepos.bind(this)
  }

  loadRepos () {
    ipcRenderer.send("populate", this.refs.url.value)
  }

  render () {
    return (
      <div style={containerStyles}>
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <p className="lead text-center">
              Enter Assignment URL
            </p>
            <input ref="url" className="form-control form-control-lg" type="text" placeholder="http://classroom.github.com/classrooms/sample-org/assignments/sample-assignment"/>
          </div>
        </div>
        <NavFooter
          left={{
            label: "Cancel",
            route: "/"
          }}
          right={{
            label: "Next: Choose Repositories",
            route: "/select",
            click: this.loadRepos
          }}
        />
      </div>
    )
  }
}

export default PopulatePage
