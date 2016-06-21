import * as React from "react"
import * as ReactDOM from "react-dom"
import {Window, Toolbar, Content, Pane, ListGroup, ListItem} from "react-photonkit"
import {createStore} from "redux"

const reducer = (state, action) => {
  switch (action.type) {
  case "SELECT_ITEM":
    return state
  default:
    return state
  }
}

const render = () => {
  ReactDOM.render(
    <App />
  , document.getElementById("app"))
}

const store = createStore(reducer)

const App = () => {
  return (
    <Window>
    <Toolbar title="header" />
    <Content>
      <Pane>
        <ListGroup>
          <ListItem
            image="https://avatars3.githubusercontent.com/u/1744446?v=3&s=400"
            title="list item"
            subtitle="subtitle"
            active />
          <ListItem
            image="https://avatars3.githubusercontent.com/u/1744446?v=3&s=400"
            title="list item"
            subtitle="subtitle" />
        </ListGroup>
      </Pane>
    </Content>
    <Toolbar psType="footer" title="footer" />
  </Window>
  )
}

store.subscribe(render)
render()
