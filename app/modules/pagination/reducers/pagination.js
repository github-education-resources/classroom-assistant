import { PAGINATION_RECEIVE_PAGE, PAGINATION_SET_FETCHING, PAGINATION_RESET, PAGINATION_SET_ASSIGNMENT_URL, PAGINATION_SET_NEXT_PAGE } from "../constants"

const initialPaginationState = {
  assignmentURL: "",
  fetching: false,
  nextPage: 1,
  submissionIds: [],
}

const pagination = (state = initialPaginationState, action) => {
  switch (action.type) {
  case PAGINATION_RESET:
    return initialPaginationState
  case PAGINATION_SET_FETCHING:
    return Object.assign({}, state, { fetching: action.payload })
  case PAGINATION_SET_ASSIGNMENT_URL:
    return Object.assign({}, state, { assignmentURL: action.url })
  case PAGINATION_SET_NEXT_PAGE:
    return Object.assign({}, state, { nextPage: action.nextPage })
  case PAGINATION_RECEIVE_PAGE:
    return Object.assign({}, state, { submissionIds: state.submissionIds.concat(action.repoIds) })
  default:
    return state
  }
}

export default pagination
