import React from "react"
import { Link } from "react-router"

import NavFooter from "../shared/components/NavFooter"

const containerStyles = {
  paddingTop: "100px"
}

const buttonWrapperStyles = {
  margin: "5px"
}

const IndexPage = () => (
  <div style={containerStyles}>
    <div className="row">
      <div className="col-sm-6 col-sm-offset-3">
        <h1 className="text-center">GitHub Classroom Desktop</h1>
        <p className="lead text-center">
          GitHub Classroom Desktop lets you archive assignments submitted on GitHub
          Classroom with a click of a button.
        </p>
        <div className="text-center">
          <Link to="select" style={buttonWrapperStyles}>
            <button className="btn btn-primary btn-lg">Get started on GitHub Classroom</button>
          </Link>
        </div>
      </div>
    </div>
    <NavFooter
      left={{
        label: "Settings",
        route: "/settings"
      }}
    />
  </div>
)

export default IndexPage
