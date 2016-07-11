import React from "react"

import AssignmentPanel from "../shared/containers/AssignmentPanel"
import SelectableSubmissionList from "./containers/SelectableSubmissionList"
import Footer from "./components/Footer"

const SelectPage = () => (
  <div>
    <AssignmentPanel />
    <SelectableSubmissionList />
    <Footer />
  </div>
)

export default SelectPage
