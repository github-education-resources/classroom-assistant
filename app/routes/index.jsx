import React, { PropTypes } from "react"
import isDev from "electron-is-dev"
import { Router, Route } from "react-router"

import DevTools from "../DevTools"
import LaunchView from "./index/index"
import SelectSubmissionsView from "./select-submissions/index"
import SelectDestinationView from "./select-destination/index"
import ArchiveProgressView from "./archive-progress/index"

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
        <Route name="progress" path="/progress" component={ArchiveProgressView} />
      </Router>
      {devToolsInstance}
    </div>
  )
}

Routes.propTypes = {
  history: PropTypes.object.isRequired
}

export default Routes
