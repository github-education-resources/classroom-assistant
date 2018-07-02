import {fetchPage} from "./pagination-fetch-page"
import {paginationSetFetchedAll} from "./pagination-set-fetched-all"
import {setURL} from "./pagination-set-url"
import {isPageLeft, nextPageId} from "../selectors"

// PUBLIC: Async thunk action for fetching all pages of repos
export const fetchAllPages = (assignmentURL) => {
  return (dispatch, getState) => {
    var urlObj = new URL(assignmentURL)
    var repoURL = `${urlObj.origin}/api/internal/${urlObj.pathname}/repos`
    dispatch(setURL(assignmentURL))
    chainFetchPage(dispatch, getState, repoURL).then(() => {
      dispatch(paginationSetFetchedAll())
    })
  }
}

const chainFetchPage = (dispatch, getState, repoURL) => {
  return dispatch(fetchPage(nextPageId(getState()), repoURL)).then(() => {
    if (isPageLeft(getState())) {
      chainFetchPage(dispatch, getState, repoURL)
    }
  })
}
