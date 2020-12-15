import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import lifecycle from "react-pure-lifecycle"
import { settingsLoginUser } from "../../modules/settings/actions/settings-login-user"
import logo from "../../resources/images/classroom-logo.png"

const methods = {
  componentDidMount (_props) {
  },
}

const IndexPage = ({ loginUser }) => (
  <div className="index-container container-fluid">
    <div className="row">
      <div className="col-5 align-self-center index-left-pane">
        <img className="index-logo" src={logo} />
      </div>
      <div className="col-7 index-right-pane">
        <div className="index-right-pane-content">
          <h1 className="text-center">
            <b>GitHub</b> Classroom Assistant
          </h1>
          <h4 className="text-center mt-2">
            Download GitHub Classroom assignments for grading with the click of
            a button.
          </h4>
          <div className="text-center mt-4">
            <button onClick={loginUser} className="btn btn-primary btn-lg">
              Log In with Classroom
            </button>
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
