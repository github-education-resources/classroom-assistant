import React from "react"
import PropTypes from "prop-types"

import SelectableSubmission from "../containers/SelectableSubmission"
import ActionableSelectAllPanel from "../containers/ActionableSelectAllPanel"

const selectDialog = function (submissions) {
  return (
    <div className="select-submission-list-container">
      <ActionableSelectAllPanel />
      { submissions.map(submission => {
        return <SelectableSubmission key={submission.id} {...submission}/>
      }) }
    </div>
  )
}

const noSubmissionDialog = function () {
  return (
    <div className="select-submission-list-container">
      <ActionableSelectAllPanel />
      <h5 className="text-danger text-center mt-4">Your assignment has no submissions on Classroom.</h5>
    </div>
  )
}

const SubmissionList = function (props, context) {
  return (
    props.submissions.length > 0 ? selectDialog(props.submissions) : noSubmissionDialog()
  )
}

SubmissionList.propTypes = {
  submissions: PropTypes.array.isRequired
}

export default SubmissionList
