import React from "react"
import PropTypes from "prop-types"

const Footer = ({
  children
}) => {
  return (
    <div className="navbar fixed-bottom shared-footer-container">
      {children}
    </div>
  )
}

Footer.propTypes = {
  children: PropTypes.any
}

export default Footer
