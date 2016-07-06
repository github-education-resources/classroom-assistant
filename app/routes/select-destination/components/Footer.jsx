import React from "react"
import { Link } from "react-router"

const containerStyles = {
  padding: "20px",
  background: "#fbfbfb",
  borderTop: "solid 1px #e3e3e3"
}

const Footer = () => (
  <div className="navbar-fixed-bottom" style={containerStyles}>
    <Link to="/select">
      <button className="btn btn-danger">Back</button>
    </Link>
    <Link to="/archive">
      <button className="btn btn-success pull-right">Begin Archive</button>
    </Link>
  </div>
)

export default Footer
