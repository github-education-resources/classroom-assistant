import * as React from "react"
import * as ReactDOM from "react-dom"
import { Router, Route, hashHistory } from "react-router"
import { syncHistoryWithStore } from "react-router-redux"
import { createStore, compose } from "redux"
import { Provider } from "react-redux"
import isDev from "electron-is-dev"
import DevTools from "./DevTools"

import reducer from "./reducers"

import LaunchView from "./components/LaunchView"
import SelectSubmissionsView from "./components/SelectSubmissionsView"

let devToolsInstance
if (isDev) {
  devToolsInstance = <DevTools />
}

const store = createStore(reducer, compose(DevTools.instrument()))
const history = syncHistoryWithStore(hashHistory, store)

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <Router history={history}>
          <Route path="/" component={LaunchView} />
          <Route path="/select" component={SelectSubmissionsView} />
        </Router>
        {devToolsInstance}
      </div>
    </Provider>
  , document.getElementById("app"))
}

store.subscribe(render)
render()
