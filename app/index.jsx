import * as React from "react"
import * as ReactDOM from "react-dom"
import {Window, Toolbar, Content, Pane, ListGroup, ListItem} from "react-photonkit"

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
          ...
        </ListGroup>
      </Pane>
    </Content>
    <Toolbar psType="footer" title="footer" />
  </Window>
  )
}

ReactDOM.render(
  <App />
, document.getElementById("app"))
