import React from "react"
import isDev from "electron-is-dev"
import { Router, Route } from "react-router"

import DevTools from "./DevTools"
import LaunchView from "./components/LaunchView"
import SelectSubmissionsView from "./components/SelectSubmissionsView"

let devToolsInstance
if (isDev) {
  devToolsInstance = <DevTools />
}

const Routes = ({
  history
}) => {
  return (
    <div>
      <Router history={history}>
        <Route path="/" component={LaunchView} />
        <Route path="/select" component={SelectSubmissionsView} />
      </Router>
      {devToolsInstance}
    </div>
  )
}

export default Routes
