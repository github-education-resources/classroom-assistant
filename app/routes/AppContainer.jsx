import React, { Component } from "react"
import PropTypes from "prop-types"

import { ipcRenderer } from "electron"

class AppContainer extends Component {
  constructor (props) {
    super(props)

    ipcRenderer.on("open-url", (event, assignmentURL) => {
      console.log(assignmentURL)
      this.props.router.push({
        pathname: "/populate",
        state: { assignmentURL: assignmentURL },
      })
    })
  }

  render () {
    return (
      <div className="container-fluid">
        {this.props.children}
      </div>
    )
  }
}

AppContainer.propTypes = {
  router: PropTypes.any.isRequired,
  children: PropTypes.any
}

export default AppContainer
