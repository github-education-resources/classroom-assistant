import React from "react"
import { Link } from "react-router"

const SelectSubmissionsViewFooter = () =>
(
  <div>
    <Link to="/">
      <button className="btn btn-danger">Cancel</button>
    </Link>
    <Link to="/destination">
      <button className="btn btn-primary">Next: Choose Destination</button>
    </Link>
  </div>
)

export default SelectSubmissionsViewFooter
