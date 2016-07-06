import React from "react"

import Footer from "./components/Footer"
import ConfirmPanel from "./components/ConfirmPanel"

const SelectDestinationView = () => (
  <div>
    <ConfirmPanel
      iconPath="http://placehold.it/48x48"
      title="SomeAssignment"
      subtitle="Individual Assignment"
    />
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

export default SelectDestinationView
