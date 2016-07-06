import React from "react"
import { Link } from "react-router"

const containerStyles = {
  padding: "20px",
  background: "#fbfbfb",
  borderTop: "solid 1px #e3e3e3"
}

const cancelButtonStyles = {
  float: "left"
}

const nextButtonStyles = {
  float: "right"
}

const SelectSubmissionsViewFooter = () => (
  <div style={containerStyles}>
    <Link to="/">
      <button className="btn btn-danger">Cancel</button>
    </Link>
    <Link to="/destination">
      <button className="btn btn-success pull-right">Next: Choose Destination</button>
    </Link>
  </div>
)

export default SelectSubmissionsViewFooter
