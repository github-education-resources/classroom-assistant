import * as React from "react"
import * as ReactDOM from "react-dom"
import { hashHistory } from "react-router"
import { syncHistoryWithStore } from "react-router-redux"
import { createStore, compose } from "redux"
import { Provider } from "react-redux"
import isDev from "electron-is-dev"

import DevTools from "./devtools"
import reducer from "./modules/reducers"
import Routes from "./routes"

const store = createStore(reducer, compose(DevTools.instrument()))
const history = syncHistoryWithStore(hashHistory, store)

let devToolsInstance
if (isDev) {
  devToolsInstance = <DevTools />
}

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <Routes history={history} />
        {devToolsInstance}
      </div>
    </Provider>
  , document.getElementById("app"))
}

store.subscribe(render)
render()
