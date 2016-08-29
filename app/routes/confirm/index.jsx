import React from "react"

import AssignmentPanel from "../../modules/assignment/containers/AssignmentPanel"
import EditDestinationPanel from "../../modules/settings/containers/EditDestinationPanel"
import SubmissionConfirmPanel from "./../../modules/submissions/containers/SubmissionConfirmPanel"
import ActionableConfirmFooter from "./containers/ActionableConfirmFooter"

const ConfirmPage = () => (
  <div>
    <AssignmentPanel />
    <SubmissionConfirmPanel />
    <EditDestinationPanel />
    <ActionableConfirmFooter />
  </div>
)

export default ConfirmPage
