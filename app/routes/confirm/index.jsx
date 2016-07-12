import React from "react"

import AssignmentPanel from "../shared/containers/AssignmentPanel"
import EditItemPanel from "../shared/components/EditItemPanel"
import Footer from "../shared/components/Footer"

const ConfirmPage = () => (
  <div>
    <AssignmentPanel />
    <EditItemPanel
      iconPath="http://placehold.it/48x48"
      title="4/10"
      subtitle="Submissions Selected"
    />
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
