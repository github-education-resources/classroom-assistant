import React from "react"

import AssignmentPanel from "../shared/containers/AssignmentPanel"
import EditDestinationPanel from "../shared/containers/EditDestinationPanel"
import SubmissionConfirmPanel from "./containers/SubmissionConfirmPanel"
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
