import React from "react"
import { connect } from "react-redux"

const containerStyle = {
  background: "green"
}

const OrganizationBanner = ({
  name,
  url
}) =>
(
  <div style={containerStyle}>
    <h1>{name}</h1>
    <p>{url}</p>
  </div>
)

const mapStateToProps = (state) => {
  return state.organization
}

export default connect(mapStateToProps, null)(OrganizationBanner)
