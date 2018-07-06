
import React from "react"

import NavFooter from "../shared/components/NavFooter"
import EditItemPanel from "../shared/components/EditItemPanel"
import EditDestinationPanel from "../shared/containers/EditDestinationPanel"
const {session} = require("electron").remote

const ConfirmPage = () => (
  <div>
    <EditItemPanel
      iconPath="https://avatars.githubusercontent.com/u/16492679?v=3&size=96"
      title="Account"
      subtitle="You are signed in as StudentEvelyn"
      onEditClick={logout}
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

const logout = () => {
  session.defaultSession.clearStorageData()
}

export default ConfirmPage
