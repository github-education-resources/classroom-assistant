import * as React from "react"
import * as ReactDOM from "react-dom"
import {Window, Toolbar, Content, Pane, ListGroup, ListItem} from "react-photonkit"
import {createStore, compose} from "redux"
import DevTools from "./DevTools"

const initialState = [
  {
    id: 1,
    text: "Item 1",
    active: false
  },
  {
    id: 2,
    text: "Item 2",
    active: true
  }
]

const itemReducer = (state, action) => {
  switch (action.type) {
  case "SELECT_ITEM":
    if (action.id === state.id) {
      return Object.assign({}, state, {active: !state.active})
    } else {
      return state
    }
  default:
    return state
  }
}

const reducer = (state, action) => {
  if (typeof state === "undefined") {
    return initialState
  }

  switch (action.type) {
  case "SELECT_ITEM":
    return state.map((item) => {
      return itemReducer(item, action)
    })
  default:
    return state
  }
}

const store = createStore(reducer, compose(DevTools.instrument()))

const render = () => {
  ReactDOM.render(
    <App
      todos={store.getState()}
      handleItemClick={(id) => {
        store.dispatch({
          type: "SELECT_ITEM",
          id: id
        })
      }}/>
  , document.getElementById("app"))
}

const Item = ({
  text,
  active,
  handleClick
}) => {
  return (
    <div
      onClick={handleClick}>
      <ListItem
          image="https://avatars3.githubusercontent.com/u/1744446?v=3&s=400"
          title={text}
          subtitle="subtitle"
          active={active} />
    </div>
  )
}

const App = ({
  todos,
  handleItemClick
}) => {
  return (
    <Window>
    <Toolbar title="header" />
    <Content>
      <Pane>
        <ListGroup>
          {todos.map((todo) => {
            return (
              <Item
                text={todo.text}
                active={todo.active}
                handleClick={() => { handleItemClick(todo.id) }}
                />
            )
          })}
        </ListGroup>
      </Pane>
    </Content>
    <Toolbar psType="footer" title="footer" />
    <DevTools store={store}/>
  </Window>
  )
}

store.subscribe(render)
render()
