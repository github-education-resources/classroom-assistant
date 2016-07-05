import React, { PropTypes } from "react"

import SelectableSubmissionList from "../containers/SelectableSubmissionList"
import { connect } from "react-redux"

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
    <div className="container">
      <div className="site-content">
        <div className="site-content-cap">
          <h4>{name}</h4>
          <p>{typeLabel}</p>
        </div>
        <div className="site-content-body">
          <SelectableSubmissionList />
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
