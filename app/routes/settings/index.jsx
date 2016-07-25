
import React from "react"

import NavFooter from "../shared/components/NavFooter"
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
    <NavFooter
      left={{
        label: "Back",
        route: "/"
      }}
    />
  </div>
)

export default ConfirmPage
