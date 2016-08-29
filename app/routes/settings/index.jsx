import React from "react"

import NavFooter from "../shared/components/NavFooter"
import EditItemPanel from "../../modules/common/components/EditItemPanel"
import EditDestinationPanel from "../../modules/settings/containers/EditDestinationPanel"

const ConfirmPage = () => (
  <div>
    <EditItemPanel
      iconPath="https://avatars.githubusercontent.com/u/16492679?v=3&size=96"
      title="Account"
      subtitle="You are signed in as StudentEvelyn"
    />
    <EditDestinationPanel />
    <NavFooter
      left={{
        label: "Back",
        route: "/"
      }}
    />
  </div>
)

export default ConfirmPage
