import {
  SUBMISSION_SELECT,
  SUBMISSION_SELECT_ALL,
  SUBMISSION_SET_CLONE_PROGRESS,
  SUBMISSION_SET_CLONE_PATH,
  SUBMISSION_SET_CLONE_STATUS,
  SUBMISSION_CREATE
} from "../constants"

const initialState = []
// const initialSubmissionState = {
  
// }


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
  switch (action.type) {
  case SUBMISSION_CREATE:
    return [
      ...state,
      action.data
    ]
  default:
    return state.map((each) => {
      return submission(each, action)
    })
  }
}

export default submissions
