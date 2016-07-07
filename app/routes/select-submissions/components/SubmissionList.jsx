import React, { PropTypes } from "react"
import Submission from "./Submission"

const SubmissionList = ({
  submissions
}) => {
  const numSelected = submissions.filter((each) => {
    return each.selected
  }).length

  return (
    <div>
      <div>
        {numSelected}/{submissions.length} selected
      </div>
      {submissions.map((submissionProps) => {
        return (
          <Submission key={submissionProps.id} {...submissionProps}/>
        )
      })}
    </div>
  )
}

SubmissionList.propTypes = {
  submissions: PropTypes.array.isRequired
}

export default SubmissionList
