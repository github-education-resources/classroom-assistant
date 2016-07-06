import React, { PropTypes } from "react"

import { connect } from "react-redux"

const mediaContainerStyles = {
  padding: "20px",
  background: "#fbfbfb",
  borderBottom: "solid 1px #e3e3e3"
}

const AssignmentPanel = ({
  name,
  type
}) => {
  let typeLabel
  if (type === "individual") {
    typeLabel = "Individual Assignment"
  } else if (type === "group") {
    typeLabel = "Group Assignment"
  }

  return (
    <div style={mediaContainerStyles}>
      <div className="media">
        <a className="media-left" href="#">
          <img src="http://placehold.it/48x48" className="media-object" alt="Generic placeholder image" />
        </a>
        <div className="media-body">
          <h4 className="media-heading">{name}</h4>
          {typeLabel}
        </div>
      </div>
    </div>
  )
}

AssignmentPanel.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["individual", "group"]).isRequired
}

const mapStateToProps = (state) => {
  return state.assignment
}

export default connect(mapStateToProps, null)(AssignmentPanel)
