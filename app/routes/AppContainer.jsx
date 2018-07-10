import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { ipcRenderer } from "electron"

import {assignmentFetchInfo} from "../modules/assignment/actions/assignment-fetch-info"
import {setAssignmentURL} from "../modules/assignment/actions/assignment-set-url"
import {settingsUpdateUserState} from "../modules/settings/actions/settings-update-user-state"

class AppContainer extends Component {
  constructor (props) {
    super(props)

    this.props.updateUserState() // Get user if already logged in from previous session

    ipcRenderer.on("open-url", (event, assignmentURL) => {
      this.props.fetchAssignment(assignmentURL)
      this.props.router.push({
        pathname: "/populate",
      })
    })

    ipcRenderer.send("initialized")
  }

  render () {
    return (
      <div className="container-fluid px-0">
        {this.props.children}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchAssignment: (assignmentURL) => {
    dispatch(setAssignmentURL(assignmentURL))
    dispatch(assignmentFetchInfo())
  },
  updateUserState: () => dispatch(settingsUpdateUserState())
})

AppContainer.propTypes = {
  fetchAssignment: PropTypes.func.isRequired,
  updateUserState: PropTypes.func.isRequired,
  router: PropTypes.any.isRequired,
  children: PropTypes.any
}

export default connect(null, mapDispatchToProps)(AppContainer)
