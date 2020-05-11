import React from "react"
import { connect } from "react-redux"

import PropTypes from "prop-types"
import EditItemPanel from "../../shared/components/EditItemPanel"
import { settingsLogoutUser } from "../../../modules/settings/actions/settings-logout-user"

const LogoutPanel = ({
  username,
  logout,
}) => {
  return (
    <EditItemPanel
      imagePath={`https://avatars.githubusercontent.com/${username}?v=3&size=96`}
      title="Account"
      subtitle={`You are logged in as ${username}`}
      onEditClick={logout}
      iconName="fa-sign-out"
    />
  )
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(settingsLogoutUser())
})

LogoutPanel.propTypes = {
  username: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(LogoutPanel)
