import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import lifecycle from "react-pure-lifecycle"

import * as Path from "path"

import {settingsLoginUser} from "../../modules/settings/actions/settings-login-user"

const methods = {
  componentDidMount (props) {
    const remote = require("electron").remote
    const trackScreen = remote.getGlobal("trackScreen")

    trackScreen("index")
  }
}

const IndexPage = ({
  loginUser
}) => (
  <div className="index-container container-fluid">
    <div className="row">
      <div className="col-5 align-self-center index-left-pane">
        <img
          className="index-logo"
          src={ Path.join(__dirname, "../../resources/images/classroom-logo.png") }
        />
      </div>
      <div className="col-7 index-right-pane">
        <div className = "index-right-pane-content">
          <h1 className="text-center">GitHub Classroom Desktop</h1>
          <p className="lead text-center">
            GitHub Classroom Desktop lets you archive assignments submitted on GitHub
            Classroom with a click of a button.
          </p>
          <div className="text-center">
            <button onClick = {loginUser} className="btn btn-primary btn-lg">Log In with Classroom</button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const mapDispatchToProps = (dispatch) => ({
  loginUser: () => {
    dispatch(settingsLoginUser())
  },
})

IndexPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
}

export default lifecycle(methods)(connect(null, mapDispatchToProps)(IndexPage))
