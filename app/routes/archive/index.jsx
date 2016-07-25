import React from "react"
import AssignmentPanel from "../shared/containers/AssignmentPanel"
import SubmissionArchivePanelList from "./containers/SubmissionArchivePanelList"
import NavFooter from "../shared/components/NavFooter"

const ArchivePage = () => (
  <div>
    <AssignmentPanel />
    <SubmissionArchivePanelList />
    <NavFooter
      left={{
        label: "Quit",
        route: "/"
      }}
    />
  </div>
)

export default ArchivePage
