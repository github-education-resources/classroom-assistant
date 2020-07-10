import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { ipcRenderer } from "electron"

import { assignmentFetchInfo } from "../modules/assignment/actions/assignment-fetch-info"
import { verifyAssignmentURL } from "../modules/assignment/actions/assignment-verify-url"
import { settingsFetchUserFromKeychain } from "../modules/settings/actions/settings-fetch-user-from-keychain"

class AppContainer extends Component {
  constructor (props) {
    super(props)

    ipcRenderer.on("open-url", async (event, assignmentURL) => {
      await this.props.fetchUserFromKeychain()

      if (assignmentURL) {
        this.props.fetchAssignment(assignmentURL)
      }
      this.props.router.push({
        pathname: "/populate",
      })
    })
  }

  async componentDidMount () {
    // Send initialized message to Main process so we can open
    // the populate page if deep link was opened
    const username = await this.props.fetchUserFromKeychain()
    if (username) {
      this.props.router.push({
        pathname: "/populate",
      })
    }
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
    dispatch(verifyAssignmentURL(assignmentURL))
    dispatch(assignmentFetchInfo())
  },
  fetchUserFromKeychain: () => dispatch(settingsFetchUserFromKeychain())
})

AppContainer.propTypes = {
  fetchAssignment: PropTypes.func.isRequired,
  fetchUserFromKeychain: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  router: PropTypes.any.isRequired,
  children: PropTypes.any
}

export default connect(null, mapDispatchToProps)(AppContainer)
