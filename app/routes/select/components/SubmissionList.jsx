import React from "react"
import PropTypes from "prop-types"

import SelectableSubmission from "../containers/SelectableSubmission"
import ActionableSelectAllPanel from "../containers/ActionableSelectAllPanel"

const SubmissionList = function (props, context) {
  return (
    <div className="select-submission-list-container">
      <ActionableSelectAllPanel />
      { props.submissions.map(submission => {
        return <SelectableSubmission key={submission.id} {...submission}/>
      }) }
    </div>
  )
}

SubmissionList.propTypes = {
  submissions: PropTypes.array.isRequired
}

export default SubmissionList
