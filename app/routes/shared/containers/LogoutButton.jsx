import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { loggedIn, username } from "../../../modules/settings/selectors"
import {settingsLogoutUser} from "../../../modules/settings/actions/settings-logout-user"

import { push } from "react-router-redux"

class LogoutButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {toggled: false}
    this.toggleState = this.toggleState.bind(this)
  }

  toggleState () {
    this.setState({toggled: !this.state.toggled})
  }

  render () {
    return (
      <div className="float-right">
        <div className="dropdown" onClick = {this.toggleState}>
          <img
            className="shared-logout-image"
            src={`https://avatars.githubusercontent.com/${this.props.username}?v=3&size=96`}
          />
          <i className="fa fa-caret-down shared-logout-icon"/>
          <div className="dropdown-menu dropdown-menu-right"
            style= {{ display: this.state.toggled ? "block" : "none" }}
          >
            <a className="dropdown-item" onClick={this.props.logout}>Sign Out</a>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: loggedIn(state),
  username: username(state),
})
const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(settingsLogoutUser())
    dispatch(push("/"))
  }
})

LogoutButton.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  username: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton)
