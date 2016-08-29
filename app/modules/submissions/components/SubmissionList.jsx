import React, { PropTypes } from "react"
import { compose, withHandlers } from "recompose"

import SelectableSubmission from "../containers/SelectableSubmission"
import ActionableSelectAllPanel from "../containers/ActionableSelectAllPanel"

const containerStyles = {
  marginBottom: "100px"
}

const enchance = compose(
  withHandlers({
    renderSubmission: (props) => (submissionProps) => {
      return (
        <SelectableSubmission key={submissionProps.id} {...submissionProps}/>
      )
    }
  })
)

const SubmissionList = enchance(({
  submissions,
  renderSubmission,
  numSelectedSubmissions
}) => {
  return (
    <div style={containerStyles}>
      <ActionableSelectAllPanel />
      {submissions.map(renderSubmission)}
    </div>
  )
})

SubmissionList.propTypes = {
  submissions: PropTypes.array.isRequired
}

export default SubmissionList
