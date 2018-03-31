import * as React from "react"
import * as ReactDOM from "react-dom"
import { hashHistory } from "react-router"
import { syncHistoryWithStore, routerMiddleware } from "react-router-redux"
import { createStore, compose, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import isDev from "electron-is-dev"

import DevTools from "./DevTools"
import reducer from "./modules/reducers"
import Routes from "./routes"

const store = createStore(
  reducer,
  compose(
    applyMiddleware(
      thunk,
      routerMiddleware(hashHistory)
    ),
    DevTools.instrument()
  )
)

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

if (module.hot) {
  module.hot.accept(render)
}
