import React from "react"

import AssignmentPanel from "../containers/AssignmentPanel"
import SelectableSubmissionList from "../containers/SelectableSubmissionList"
import SelectSubmissionsViewFooter from "./SelectSubmissionsViewFooter"

const SelectSubmissionsView = () => (
  <div>
    <AssignmentPanel />
    <SelectableSubmissionList />
    <SelectSubmissionsViewFooter />
  </div>
)

export default SelectSubmissionsView
