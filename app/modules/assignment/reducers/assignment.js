import { ASSIGNMENT_SET_TITLE, ASSIGNMENT_SET_TYPE } from "../constants"

const initialState = {}

const assignment = (state = initialState, action) => {
  switch (action.type) {
  case ASSIGNMENT_SET_TITLE:
    return Object.assign({}, state, {name: action.payload})
  case ASSIGNMENT_SET_TYPE:
    return Object.assign({}, state, {type: action.payload})
  default:
    return state
  }
}

export default assignment
