import React from "react"
import isDev from "electron-is-dev"
import { Router, Route } from "react-router"

import DevTools from "./DevTools"
import LaunchView from "./components/LaunchView"
import SelectSubmissionsView from "./components/SelectSubmissionsView"
import SelectDestinationView from "./components/SelectDestinationView"

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
        <Route name="home" path="/" component={LaunchView} />
        <Route name="select" path="/select" component={SelectSubmissionsView} />
        <Route name="destination" path="/destination" component={SelectDestinationView} />
      </Router>
      {devToolsInstance}
    </div>
  )
}

export default Routes
