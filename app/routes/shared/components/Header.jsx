import React from "react"
import PropTypes from "prop-types"

import LogoutButton from "../containers/LogoutButton"

const Header = ({
  children
}) => {
  return (
    <div className={process.platform === "darwin" ? "darwin" : "windows"}>
      <div className="shared-header-navbar fixed-top">
        {process.platform === "darwin" && <div className="shared-header-toolbar"/>}

        <div className="container-fluid shared-header-content h-100">
          <div className = "row align-items-center align-self-center h-100">
            <div className = "col-10">
              {children}
            </div>
            <div className = "col-2">
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
      <div className="shared-header-spacer"/>
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
