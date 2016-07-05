import * as React from "react"
import * as ReactDOM from "react-dom"
import { createStore, compose } from "redux"
import { Provider } from "react-redux"
import isDev from "electron-is-dev"
import DevTools from "./DevTools"

import reducer from "./reducers"

import SelectSubmissionsView from "./components/SelectSubmissionsView"

let devToolsInstance
if (isDev) {
  devToolsInstance = <DevTools />
}

const store = createStore(reducer, compose(DevTools.instrument()))

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <SelectSubmissionsView />
        {devToolsInstance}
      </div>
    </Provider>
  , document.getElementById("app"))
}

store.subscribe(render)
render()
