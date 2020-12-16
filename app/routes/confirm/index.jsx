import React from "react"
import lifecycle from "react-pure-lifecycle"

import AssignmentPanel from "../shared/containers/AssignmentPanel"
import EditDestinationPanel from "../shared/containers/EditDestinationPanel"
import SubmissionConfirmPanel from "./containers/SubmissionConfirmPanel"
import ActionableConfirmFooter from "./containers/ActionableConfirmFooter"

const methods = {
  componentDidMount (_props) {
  }
}

const ConfirmPage = () => (
  <div>
    <AssignmentPanel />
    <SubmissionConfirmPanel />
    <EditDestinationPanel />
    <ActionableConfirmFooter />
  </div>
)

export default lifecycle(methods)(ConfirmPage)
