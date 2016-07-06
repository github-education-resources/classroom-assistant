import React from "react"
import { Link } from "react-router"

console.log("Got here")

const LaunchView = () => (
  <div>
    <p>Launch View</p>
    <Link to="select"> Select Submissions </Link>
  </div>
)

export default LaunchView
