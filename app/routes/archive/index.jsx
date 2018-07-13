import React from "react"
import LoadingAssignmentPanel from "./containers/LoadingAssignmentPanel"
import SubmissionArchivePanelList from "./containers/SubmissionArchivePanelList"
import NavFooter from "../shared/components/NavFooter"

const ArchivePage = () => (
  <div>
    <LoadingAssignmentPanel/>
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
