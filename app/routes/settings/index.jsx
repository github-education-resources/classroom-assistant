
import React from "react"

import Footer from "../shared/components/Footer"
import EditItemPanel from "../shared/components/EditItemPanel"

const ConfirmPage = () => (
  <div>
    <EditItemPanel
      iconPath="https://avatars.githubusercontent.com/u/16492679?v=3&size=96"
      title="Account"
      subtitle="You are signed in as StudentEvelyn"
    />
    <EditItemPanel
      iconPath="http://placehold.it/48x48"
      title="Archive Destination"
      subtitle="Archived submissions will be saved to /some/default/path"
    />
    <Footer
      left={{
        label: "Back",
        route: "/"
      }}
    />
  </div>
)

export default ConfirmPage
