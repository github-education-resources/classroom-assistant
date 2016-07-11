import React from "react"

import { Link } from "react-router"

const containerStyles = {
  padding: "20px",
  background: "#fbfbfb",
  borderTop: "solid 1px #e3e3e3"
}

const Footer = () => (
  <div className="navbar-fixed-bottom" style={containerStyles}>
    <Link to="/">
      <button className="btn btn-danger">Close</button>
    </Link>
  </div>
)

export default Footer
