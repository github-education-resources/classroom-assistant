import React from "react"

import AssignmentPanel from "./containers/AssignmentPanel"
import SelectableSubmissionList from "./containers/SelectableSubmissionList"
import Footer from "./components/Footer"

const SelectSubmissionsView = () => (
  <div>
    <AssignmentPanel />
    <SelectableSubmissionList />
    <Footer />
  </div>
)

export default SelectSubmissionsView
