import {
  SUBMISSION_SELECT,
  SUBMISSION_SELECT_ALL,
  SUBMISSION_SET_CLONE_PROGRESS,
  SUBMISSION_SET_CLONE_PATH,
  SUBMISSION_SET_CLONE_STATUS,
  SUBMISSION_CREATE,
  SUBMISSION_RESET,
} from "../constants"

const initialSubmissionState = {
  id: null,
  username: "",
  displayName: "",
  avatarUrl: "",
  repoUrl: "",
  selected: true,
  clonePath: "",
  cloneStatus: "",
  cloneProgress: 0,
}

const initialState = []

const submission = (state, action) => {
  switch (action.type) {
  case SUBMISSION_SELECT:
    if (action.id === state.id) {
      return Object.assign({}, state, { selected: !state.selected })
    } else {
      return state
    }
    // TODO: Move out to global state with pathutils fix
  case SUBMISSION_SET_CLONE_PATH:
    if (action.id === state.id) {
      return Object.assign({}, state, { clonePath: action.clonePath })
    } else {
      return state
    }
  case SUBMISSION_SET_CLONE_STATUS:
    if (action.id === state.id) {
      return Object.assign({}, state, { cloneStatus: action.cloneStatus })
    } else {
      return state
    }
  case SUBMISSION_SET_CLONE_PROGRESS:
    if (action.id === state.id) {
      return Object.assign({}, state, {
        cloneProgress: action.cloneProgress,
      })
    } else {
      return state
    }
  case SUBMISSION_SELECT_ALL:
    return Object.assign({}, state, { selected: action.newValue })
  default:
    return state
  }
}

const submissions = (state, action) => {
  if (typeof state === "undefined") {
    return initialState
  }
  const newState = [...state]

  switch (action.type) {
  case SUBMISSION_RESET:
    return initialState
  case SUBMISSION_CREATE:
    action.submissions.map((submission) => {
      newState.push(Object.assign({}, initialSubmissionState, submission))
    })
    return newState
  default:
    return state.map((each) => {
      return submission(each, action)
    })
  }
}

export default submissions
