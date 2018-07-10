import React, {Component} from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import Header from "../components/Header"
import { all, typeLabel } from "../../../modules/assignment/selectors"
import settingsLogoutUser from "../../../modules/settings/actions/settings-logout-user"

class AssignmentPanel extends Component {
  constructor (props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout () {
    this.props.logoutUser()
    this.props.router.push({
      pathname: "/populate",
    })
  }

  render () {
    return (
      <Header {...this.props}>
        <button type="button" className="btn btn-danger pull-right" onClick={this.logout}>Log Out</button>
      </Header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    title: all(state).name,
    subtitle: typeLabel(state),
    imagePath: "http://placehold.it/48x48",
  }
}

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => {
    dispatch(settingsLogoutUser())
  },
})

AssignmentPanel.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  router: PropTypes.any.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentPanel)
