import React from "react"
import PropTypes from "prop-types"

import SelectableSubmission from "../containers/SelectableSubmission"
import ActionableSelectAllPanel from "../containers/ActionableSelectAllPanel"
import { RingLoader } from "react-spinners"

const containerStyles = {
  marginBottom: "100px"
}

const loaderStyles = {
  marginLeft: "100px"
}

const SubmissionList = function (props, context) {
  let loading

  if(props.submissions.length< 1){
    loading = (
      <div className="text-center">
        <p>Loading Assignment Information...</p>
      </div>
    );
  }

  return (
    <div style={containerStyles}>
      {loading}
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
