import {fetchPage} from "./pagination-fetch-page"
import {paginationSetFetching} from "./pagination-set-fetching"
import {paginationSetAssignmentURL} from "./pagination-set-assignment-url"
import {nextPage} from "../selectors"

// PUBLIC: Async thunk action for fetching all pages of repos
export const fetchAllPages = (assignmentURL) => {
  return (dispatch, getState) => {
    var urlObj = new URL(assignmentURL)
    var repoURL = `${urlObj.origin}/api/internal/${urlObj.pathname}/repos`
    dispatch(paginationSetAssignmentURL(assignmentURL))
    dispatch(paginationSetFetching(true))
    return chainFetchPage(dispatch, getState, repoURL).then(() => {
      dispatch(paginationSetFetching(false))
    })
  }
}

const chainFetchPage = (dispatch, getState, repoURL) => {
  return dispatch(fetchPage(repoURL, nextPage(getState()))).then(() => {
    if (nextPage(getState())) {
      return chainFetchPage(dispatch, getState, repoURL)
    }
  })
}
