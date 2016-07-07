import React from "react"
import AssignmentPanel from "../../shared-containers/AssignmentPanel"
import SubmissionArchivePanelList from "./containers/SubmissionArchivePanelList"
import Footer from "./components/Footer"

const ArchiveProgressView = () => (
  <div>
    <AssignmentPanel />
    <SubmissionArchivePanelList />
    <Footer />
  </div>
)

export default ArchiveProgressView
