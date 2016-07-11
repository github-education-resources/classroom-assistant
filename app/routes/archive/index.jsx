import React from "react"
import AssignmentPanel from "../shared/containers/AssignmentPanel"
import SubmissionArchivePanelList from "./containers/SubmissionArchivePanelList"
import Footer from "../shared/components/Footer"

const ArchivePage = () => (
  <div>
    <AssignmentPanel />
    <SubmissionArchivePanelList />
    <Footer
      left={{
        label: "Quit",
        route: "/"
      }}
    />
  </div>
)

export default ArchivePage
