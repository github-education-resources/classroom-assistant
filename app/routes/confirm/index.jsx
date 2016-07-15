import React from "react"

import AssignmentPanel from "../shared/containers/AssignmentPanel"
import EditItemPanel from "../shared/components/EditItemPanel"
import SubmissionConfirmPanel from "./containers/SubmissionConfirmPanel"
import Footer from "../shared/components/Footer"

const ConfirmPage = () => (
  <div>
    <AssignmentPanel />
    <SubmissionConfirmPanel />
    <EditItemPanel
      iconPath="http://placehold.it/48x48"
      title="some/default/path"
      subtitle="Archive Destination"
    />
    <Footer
      left={{
        label: "Back",
        route: "/select"
      }}
      right={{
        label: "Next: Begin Archive",
        route: "/archive"
      }}
    />
  </div>
)

export default ConfirmPage
