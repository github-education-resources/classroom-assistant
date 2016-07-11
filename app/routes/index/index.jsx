import React from "react"
import { Link } from "react-router"

const containerStyles = {
  paddingTop: "50px"
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
          <Link to="select">
            <button className="btn btn-primary btn-lg">Get started on GitHub Classroom</button>
          </Link>
        </div>
      </div>
    </div>
  </div>
)

export default IndexPage
