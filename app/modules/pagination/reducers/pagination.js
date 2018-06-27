import { REQUEST_PAGE, RECEIVE_PAGE, RECEIVE_METADATA, FETCHING_ALL_PAGES } from "../constants"

const initialPaginationState = {
  pages: [],
  isFetchingAll: false,
}

const initialPageState = {
  repoIds: [],
  isFetching: false,
}

const page = (state, action) => {
  switch (action.type) {
  case RECEIVE_PAGE:
    if (action.id === state.id) {
      return Object.assign({}, state, {repoIds: action.repoIds, isFetching: false})
    } else {
      return state
    }
  case RECEIVE_METADATA:
    if (action.id === state.id) {
      return Object.assign({}, state, {nextPageId: action.nextPageId})
    } else {
      return state
    }
  default:
    return state
  }
}

const pages = (state = initialPaginationState, action) => {
  switch (action.type) {
  case FETCHING_ALL_PAGES:
    return Object.assign({}, state, {isFetchingAll: action.value})
  case REQUEST_PAGE:
    return Object.assign({}, state, { pages: [
      ...state.pages,
      Object.assign({}, initialPageState, {id: action.id, isFetching: true})
    ]})
  default:
    return Object.assign({}, state, {
      pages: state.pages.map((each) => {
        return page(each, action)
      })
    })
  }
}

export default pages
