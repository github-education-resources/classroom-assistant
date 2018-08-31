import React from "react"
import PropTypes from "prop-types"

import LogoutButton from "../containers/LogoutButton"

const Header = ({
  children
}) => {
  return (
    <div className="navbar" className="shared-header-navbar">
      <div className="shared-header-toolbar"/>
      <div className="container shared-header-content">
        <div className = "row align-items-center">
          <div className = "col-10">
            {children}
          </div>
          <div className = "col-2">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  imagePath: PropTypes.string.isRequired,
  children: PropTypes.array
}

export default Header
