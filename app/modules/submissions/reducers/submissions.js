import {
  SUBMISSION_SELECT,
  SUBMISSION_SELECT_ALL,
  SUBMISSION_SET_CLONE_PROGRESS,
  SUBMISSION_SET_CLONE_PATH,
  SUBMISSION_SET_CLONE_STATUS
} from "../constants"

const initialState = [
  {
    id: 1,
    username: "StudentEvelyn",
    displayName: "Evelyn",
    avatarUrl: "https://avatars.githubusercontent.com/u/16492679?v=3&size=96",
    repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentEvelyn",
    selected: true,
    clonePath: "",
    cloneStatus: "",
    cloneProgress: 0
  }, {
    id: 2,
    username: "StudentMax",
    displayName: "Max",
    avatarUrl: "https://avatars.githubusercontent.com/u/16492576?v=3&size=96",
    repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentMax",
    selected: true,
    clonePath: "",
    cloneStatus: "",
    cloneProgress: 0
  }, {
    id: 3,
    username: "StudentZi",
    displayName: "Zi",
    avatarUrl: "https://avatars.githubusercontent.com/u/16492482?v=3&size=96",
    repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentZi",
    selected: true,
    clonePath: "",
    cloneStatus: "",
    cloneProgress: 0
  }, {
    id: 4,
    username: "StudentAli",
    displayName: "Ali",
    avatarUrl: "https://avatars.githubusercontent.com/u/16492425?v=3&size=96",
    repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentAli",
    selected: true,
    clonePath: "",
    cloneStatus: "",
    cloneProgress: 0
  }, {
    id: 5,
    username: "StudentShay",
    displayName: "Shay",
    avatarUrl: "https://avatars.githubusercontent.com/u/16492375?v=3&size=96",
    repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentShay",
    selected: true,
    clonePath: "",
    cloneStatus: "",
    cloneProgress: 0
  }, {
    id: 6,
    username: "StudentZara",
    displayName: "Zara",
    avatarUrl: "https://avatars.githubusercontent.com/u/16479545?v=3&size=96",
    repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentZara",
    selected: true,
    clonePath: "",
    cloneStatus: "",
    cloneProgress: 0
  }
]

const submission = (state, action) => {
  switch (action.type) {
  case SUBMISSION_SELECT:
    if (action.id === state.id) {
      return Object.assign({}, state, {selected: !state.selected})
    } else {
      return state
    }
  case SUBMISSION_SET_CLONE_PATH:
    if (action.id === state.id) {
      return Object.assign({}, state, {clonePath: action.clonePath})
    } else {
      return state
    }
  case SUBMISSION_SET_CLONE_STATUS:
    if (action.id === state.id) {
      return Object.assign({}, state, {cloneStatus: action.cloneStatus})
    } else {
      return state
    }
  case SUBMISSION_SET_CLONE_PROGRESS:
    if (action.id === state.id) {
      let newProgress
      if (action.cloneProgress > 100) {
        newProgress = 100
      } else if (action.cloneProgress < 0) {
        newProgress = 0
      } else {
        newProgress = action.cloneProgress
      }
      return Object.assign({}, state, {cloneProgress: newProgress})
    } else {
      return state
    }
  case SUBMISSION_SELECT_ALL:
    return Object.assign({}, state, {selected: action.newValue})
  default:
    return state
  }
}

const submissions = (state, action) => {
  if (typeof state === "undefined") {
    return initialState
  }

  return state.map((each) => {
    return submission(each, action)
  })
}

export default submissions
