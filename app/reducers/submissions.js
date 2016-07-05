const initialState = [
  {
    id: 1,
    username: "nicktikhonov",
    displayName: "Nick Tikhonov",
    avatarUrl: "https://avatars.githubusercontent.com/u/6755555?v=3&size=96",
    repoUrl: "https://github.com/education/classroom-desktop",
    selected: true
  }, {
    id: 2,
    username: "nicktikhonov",
    displayName: "Nick Tikhonov",
    avatarUrl: "https://avatars.githubusercontent.com/u/6755555?v=3&size=96",
    repoUrl: "https://github.com/education/classroom-desktop",
    selected: true
  }, {
    id: 3,
    username: "nicktikhonov",
    displayName: "Nick Tikhonov",
    avatarUrl: "https://avatars.githubusercontent.com/u/6755555?v=3&size=96",
    repoUrl: "https://github.com/education/classroom-desktop",
    selected: true
  }
]

const submission = (state, action) => {
  switch (action.type) {
  case "SELECT_ITEM":
    if (action.id === state.id) {
      return Object.assign({}, state, {selected: !state.selected})
    } else {
      return state
    }
  default:
    return state
  }
}

const submissions = (state, action) => {
  if (typeof state === "undefined") {
    return initialState
  }

  switch (action.type) {
  case "SELECT_ITEM":
    return state.map((each) => {
      return submission(each, action)
    })

  default:
    return state
  }
}

export default submissions
