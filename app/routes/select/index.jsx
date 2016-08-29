import React from "react"

import AssignmentPanel from "../../modules/assignment/containers/AssignmentPanel"
import SelectableSubmissionList from "./../../modules/submissions/containers/SelectableSubmissionList"
import NavFooter from "../shared/components/NavFooter"

const SelectPage = () => (
  <div>
    <AssignmentPanel />
    <SelectableSubmissionList />
    <NavFooter
      left={{
        label: "Cancel",
        route: "/"
      }}
      right={{
        label: "Next: Choose Destination",
        route: "/confirm"
      }}
    />
  </div>
)

export default SelectPage
