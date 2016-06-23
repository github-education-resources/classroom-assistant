import * as React from "react"
import * as ReactDOM from "react-dom"
import {Window, Toolbar, Content} from "react-photonkit"
import {createStore, compose} from "redux"
import DevTools from "./DevTools"

import SelectableItemList from "./containers/SelectableItemList"
import { Provider } from "react-redux"

import items from "./reducers/items"
const store = createStore(items, compose(DevTools.instrument()))

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Window>
        <Toolbar title="header" />
        <Content>
          <SelectableItemList />
        </Content>
        <Toolbar psType="footer" title="footer" />
        <DevTools store={store}/>
      </Window>
    </Provider>
  , document.getElementById("app"))
}

store.subscribe(render)
render()
