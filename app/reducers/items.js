const initialState = {
  items: [
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
}

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

const items = (state, action) => {
  if (typeof state === "undefined") {
    return initialState
  }

  switch (action.type) {
  case "SELECT_ITEM":
    return {
      items: state.items.map((item) => {
        return itemReducer(item, action)
      })
    }

  default:
    return state
  }
}

export default items
