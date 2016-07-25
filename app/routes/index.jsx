import React, { PropTypes } from "react"
import { Router, Route } from "react-router"

import IndexPage from "./index/index"
import SelectPage from "./select/index"
import ConfirmPage from "./confirm/index"
import ArchivePage from "./archive/index"
import SettingsPage from "./settings/index"

const Routes = ({
  history
}) => {
  return (
    <Router history={history}>
      <Route name="index" path="/" component={IndexPage} />
      <Route name="select" path="/select" component={SelectPage} />
      <Route name="confirm" path="/confirm" component={ConfirmPage} />
      <Route name="archive" path="/archive" component={ArchivePage} />
      <Route name="settings" path="/settings" component={SettingsPage} />
    </Router>
  )
}

Routes.propTypes = {
  history: PropTypes.object.isRequired
}

export default Routes
