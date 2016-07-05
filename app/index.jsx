import * as React from "react"
import * as ReactDOM from "react-dom"
import {Window, Toolbar, Content} from "react-photonkit"
import {createStore, compose} from "redux"
import { Provider } from "react-redux"
import isDev from "electron-is-dev"
import DevTools from "./DevTools"

import reducer from "./reducers"
import SelectableItemList from "./containers/SelectableItemList"

let devToolsInstance
if (isDev) {
  devToolsInstance = <DevTools />
}

const store = createStore(reducer, compose(DevTools.instrument()))

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Window>
        <Toolbar title="header" />
        <Content>
          <SelectableItemList />
        </Content>
        <Toolbar psType="footer" title="footer" />
        {devToolsInstance}
      </Window>
    </Provider>
  , document.getElementById("app"))
}

store.subscribe(render)
render()
