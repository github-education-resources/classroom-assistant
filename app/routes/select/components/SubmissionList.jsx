import React from "react"
import PropTypes from "prop-types"

import SelectableSubmission from "../containers/SelectableSubmission"
import ActionableSelectAllPanel from "../containers/ActionableSelectAllPanel"

const containerStyles = {
  marginBottom: "100px"
}

const SubmissionList = function (props, context) {
  return (
    <div style={containerStyles}>
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
