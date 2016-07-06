import React, { PropTypes } from "react"
import Submission from "./Submission"

const containerStyles = {
  paddingTop: "20px",
  paddingBottom: "20px"
}

const SubmissionList = ({
  submissions
}) => (
  <div style={containerStyles}>
    <div className="container">
      {submissions.map((submissionProps) => {
        return (
          <Submission key={submissionProps.id} {...submissionProps}/>
        )
      })}
    </div>
  </div>
)

SubmissionList.propTypes = {
  submissions: PropTypes.array.isRequired
}

export default SubmissionList
