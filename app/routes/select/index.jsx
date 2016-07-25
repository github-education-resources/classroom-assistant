import React from "react"

import AssignmentPanel from "../shared/containers/AssignmentPanel"
import SelectableSubmissionList from "./containers/SelectableSubmissionList"
import Footer from "../shared/components/Footer"

const SelectPage = () => (
  <div>
    <AssignmentPanel />
    <SelectableSubmissionList />
    <Footer
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
