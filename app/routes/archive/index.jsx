import React from "react"
import AssignmentPanel from "../shared/containers/AssignmentPanel"
import SubmissionArchivePanelList from "./containers/SubmissionArchivePanelList"
import NavFooter from "../shared/components/NavFooter"
import ArchiveProgressPanel from "./containers/ArchiveProgressPanel"

const ArchivePage = () => (
  <div>
    <AssignmentPanel/>
    <ArchiveProgressPanel/>
    <SubmissionArchivePanelList />
    <NavFooter
      left={{
        label: "Quit",
        route: "/populate"
      }}
    />
  </div>
)

export default ArchivePage
