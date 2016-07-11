import React from "react"
import AssignmentPanel from "../shared/containers/AssignmentPanel"
import SubmissionArchivePanelList from "./containers/SubmissionArchivePanelList"
import Footer from "./components/Footer"

const ArchivePage = () => (
  <div>
    <AssignmentPanel />
    <SubmissionArchivePanelList />
    <Footer />
  </div>
)

export default ArchivePage
