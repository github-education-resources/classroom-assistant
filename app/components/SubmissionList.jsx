import React, { PropTypes } from "react"
import Submission from "./Submission"

const containerStyles = {
  paddingTop: "20px",
  paddingBottom: "20px"
}

const SubmissionList = ({
  submissions
}) => {
  const numSelected = submissions.filter((each) => {
    return each.selected
  }).length

  return (
    <div style={containerStyles}>
      <div className="container">
        <div>
          {numSelected}/{submissions.length} selected
        </div>
        {submissions.map((submissionProps) => {
          return (
            <Submission key={submissionProps.id} {...submissionProps}/>
          )
        })}
      </div>
    </div>
  )
}

SubmissionList.propTypes = {
  submissions: PropTypes.array.isRequired
}

export default SubmissionList
