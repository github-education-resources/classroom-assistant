import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import lifecycle from "react-pure-lifecycle"

import NavFooter from "../shared/components/NavFooter"
import EditDestinationPanel from "../shared/containers/EditDestinationPanel"
import LogoutPanel from "./components/LogoutPanel"
import LoginPanel from "./components/LoginPanel"
import { username } from "../../modules/settings/selectors"

const methods = {
  componentDidMount (_props) {
  }
}

const ConfirmPage = ({
  username
}) => {
  return (
    <div>
      {username ? <LogoutPanel username = {username}/> : <LoginPanel/>}
      <EditDestinationPanel />
      <NavFooter
        left={{
          label: "Back",
          route: "/"
        }}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  username: username(state)
})

ConfirmPage.propTypes = {
  username: PropTypes.string.isRequired,
}

export default lifecycle(methods)(connect(mapStateToProps, null)(ConfirmPage))
