import React, { PropTypes } from "react"
import Submission from "./Submission"
import SelectAllPanel from "./SelectAllPanel"

const SubmissionList = ({
  submissions
}) => {
  const numSelected = submissions.filter((each) => {
    return each.selected
  }).length

  return (
    <div>
      <SelectAllPanel selected={numSelected} total={submissions.length} />
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
