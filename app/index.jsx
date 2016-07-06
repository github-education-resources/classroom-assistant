import * as React from "react"
import * as ReactDOM from "react-dom"
import { hashHistory } from "react-router"
import { syncHistoryWithStore } from "react-router-redux"
import { createStore, compose } from "redux"
import { Provider } from "react-redux"

import DevTools from "./devtools"
import reducer from "./reducers"
import Routes from "./routes"

const store = createStore(reducer, compose(DevTools.instrument()))
const history = syncHistoryWithStore(hashHistory, store)

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Routes history={history} />
    </Provider>
  , document.getElementById("app"))
}

store.subscribe(render)
render()
