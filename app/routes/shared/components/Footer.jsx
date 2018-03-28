import React from "react"
import PropTypes from "prop-types"

const containerStyles = {
  padding: "20px",
  background: "#fbfbfb",
  borderTop: "solid 1px #e3e3e3"
}

const Footer = ({
  children
}) => {
  return (
    <div className="navbar-fixed-bottom" style={containerStyles}>
      {children}
    </div>
  )
}

Footer.propTypes = {
  children: PropTypes.any
}

export default Footer
