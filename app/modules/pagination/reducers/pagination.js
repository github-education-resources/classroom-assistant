import { PAGINATION_REQUEST, PAGINATION_RECEIVE, PAGINATION_RECEIVE_METADATA, PAGINATION_FETCHED_ALL, PAGINATION_RESET, PAGINATION_SET_URL } from "../constants"

const initialPaginationState = {
  pages: [],
  fetchedAll: false,
  url: "",
}

const initialPageState = {
  repoIds: [],
  isFetching: false,
}

const page = (state, action) => {
  switch (action.type) {
  case PAGINATION_RECEIVE:
    if (action.id === state.id) {
      return Object.assign({}, state, {repoIds: action.repoIds, isFetching: false})
    } else {
      return state
    }
  case PAGINATION_RECEIVE_METADATA:
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
  case PAGINATION_RESET:
    return initialPaginationState
  case PAGINATION_FETCHED_ALL:
    return Object.assign({}, state, {fetchedAll: true})
  case PAGINATION_SET_URL:
    return Object.assign({}, state, {url: action.url})
  case PAGINATION_REQUEST:
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
