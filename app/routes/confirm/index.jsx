import React from "react"

import AssignmentPanel from "../shared/containers/AssignmentPanel"
import ConfirmPanel from "./components/ConfirmPanel"
import Footer from "../shared/components/Footer"

const ConfirmPage = () => (
  <div>
    <AssignmentPanel />
    <ConfirmPanel
      iconPath="http://placehold.it/48x48"
      title="4/10"
      subtitle="Submissions Selected"
    />
    <ConfirmPanel
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
