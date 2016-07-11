import React from "react"

import AssignmentPanel from "../shared/containers/AssignmentPanel"
import Footer from "./components/Footer"
import ConfirmPanel from "./components/ConfirmPanel"

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
    <Footer />
  </div>
)

export default ConfirmPage
