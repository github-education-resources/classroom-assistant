import React from "react"

import OrganizationBanner from "../containers/OrganizationBanner"
import AssignmentPanel from "../containers/AssignmentPanel"
import SelectSubmissionsViewFooter from "./SelectSubmissionsViewFooter"

const SelectSubmissionsView = () =>
(
  <div>
    <OrganizationBanner />
    <AssignmentPanel />
    <SelectSubmissionsViewFooter />
  </div>
)

export default SelectSubmissionsView
