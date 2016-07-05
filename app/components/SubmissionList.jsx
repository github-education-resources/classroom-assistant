import React, { PropTypes } from "react"
import Submission from "./Submission"

const SubmissionList = ({
  submissions
}) => (
  <div>
    {submissions.map((submissionProps) => {
      return (
        <Submission key={submissionProps.id} {...submissionProps}/>
      )
    })}
  </div>
)

SubmissionList.propTypes = {
  submissions: PropTypes.array.isRequired
}

export default SubmissionList
