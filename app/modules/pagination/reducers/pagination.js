import { REQUEST_PAGE, RECEIVE_PAGE, RECEIVE_METADATA } from "../constants"

const initialPaginationState = []

const initialPageState = {
  repoIds: [],
  isFetching: false,
  nextPageURL: "",
}

const page = (state, action) => {
  switch(action.type){
    case RECEIVE_PAGE:
      if(action.id === state.id){
        return Object.assign({}, state, {repoIds: action.repoIds, isFetching: false})
      }
    case RECEIVE_METADATA:
      if(action.id === state.id){
        return Object.assign({}, state, {nextPageURL: action.nextPageURL})
      }
    default:
      return state
  }
}

const pages = (state = initialPaginationState, action) => {
  switch (action.type) {
    case REQUEST_PAGE:
      return [
        ...state,
        Object.assign({}, initialPageState, {id: action.id, isFetching: true})
      ]
    default:
      return state.map((each) => {
        return page(each, action)
      })
  }
}

export default pages
