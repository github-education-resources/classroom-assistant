import React from "react"

import AssignmentPanel from "../shared/containers/AssignmentPanel"
import EditItemPanel from "../shared/components/EditItemPanel"
import SubmissionConfirmPanel from "./containers/SubmissionConfirmPanel"
import ActionableConfirmFooter from "./containers/ActionableConfirmFooter"

const ConfirmPage = () => (
  <div>
    <AssignmentPanel />
    <SubmissionConfirmPanel />
    <EditItemPanel
      iconPath="http://placehold.it/48x48"
      title="some/default/path"
      subtitle="Archive Destination"
    />
    <ActionableConfirmFooter />
  </div>
)

export default ConfirmPage
