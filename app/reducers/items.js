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

const item = (state, action) => {
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

const items = (state, action) => {
  if (typeof state === "undefined") {
    return initialState
  }

  switch (action.type) {
  case "SELECT_ITEM":
    return state.map((each) => {
      return item(each, action)
    })

  default:
    return state
  }
}

export default items
