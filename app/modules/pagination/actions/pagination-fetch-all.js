import {fetchPage} from "./pagination-fetch-page"
import {setFetchingAllPages} from "./pagination-set-fetching"
import {isPageLeft, nextPageId} from "../selectors"

// PUBLIC: Async thunk action for fetching all pages of repos
export const fetchAllPages = (repoURL) => {
  return (dispatch, getState) => {
    dispatch(setFetchingAllPages(true))
    chainFetchPage(dispatch, getState, repoURL)
    dispatch(setFetchingAllPages(false))
  }
}

const chainFetchPage = (dispatch, getState, repoURL) => {
  dispatch(fetchPage(nextPageId(getState()), repoURL)).then(() => {
    if (isPageLeft(getState())) {
      chainFetchPage(dispatch, getState, repoURL)
    }
  })
}
