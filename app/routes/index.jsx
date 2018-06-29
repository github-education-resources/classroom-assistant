import React from "react"
import PropTypes from "prop-types"

import { Router } from "react-router"

import AppContainer from "./AppContainer"
import IndexPage from "./index/index"
import SelectPage from "./select/index"
import ConfirmPage from "./confirm/index"
import ArchivePage from "./archive/index"
import SettingsPage from "./settings/index"
import PopulatePage from "./populate/populate"

const routeConfig = {
  component: AppContainer,
  childRoutes: [
    {
      path: "/",
      component: IndexPage
    },
    {
      path: "/populate",
      component: PopulatePage
    },
    {
      path: "/select",
      name: "select",
      component: SelectPage
    },
    {
      path: "/confirm",
      component: ConfirmPage
    },
    {
      path: "/archive",
      component: ArchivePage
    },
    {
      path: "/settings",
      component: SettingsPage
    }
  ]
}

const Routes = ({
  history
}) => {
  return (
    <Router history={history} routes={routeConfig} />
  )
}

Routes.propTypes = {
  history: PropTypes.object.isRequired
}

export default Routes
