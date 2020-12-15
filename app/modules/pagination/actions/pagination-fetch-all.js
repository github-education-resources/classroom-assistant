import { remote } from "electron"

import { fetchPage } from "./pagination-fetch-page"
import { paginationSetFetching } from "./pagination-set-fetching"
import { paginationSetAssignmentURL } from "./pagination-set-assignment-url"
import { nextPage } from "../selectors"
import { all } from "../../assignment/selectors"
import { settingsLogoutUser } from "../../settings/actions/settings-logout-user"

let accessToken
/**
 * PUBLIC: Fetch all pages of repositories associated with an assignment
 *
 * @return An asynchronous thunk action which resolves once all pages have been fetched
 */
export const fetchAllPages = (assignmentURL) => {
  return (dispatch, getState) => {
    // Sets to null if password cannot be found
    // TODO: Add specific error message/ask for reauthorization if clone
    // fails
    accessToken = remote.getGlobal("accessToken")

    if (!accessToken) {
      dispatch(settingsLogoutUser())
      return
    }

    const urlObj = new URL(assignmentURL)

    let repoURL = `https://classroom.github.com/api/internal/${urlObj.pathname}/`
    if (all(getState()).type === "individual") {
      repoURL += "assignment_repos"
    } else {
      repoURL += "group-assignment-repos"
    }
    dispatch(paginationSetAssignmentURL(assignmentURL))
    dispatch(paginationSetFetching(true))
    return chainFetchPage(dispatch, getState, repoURL).then(() => {
      dispatch(paginationSetFetching(false))
    })
  }
}

/**
 * PRIVATE: Dispatches fetch page while nextPage attribute of pagination is true
 *
 * @return An asynchronous thunk action which resolves once all pages have been fetched
 */
const chainFetchPage = (dispatch, getState, repoURL) => {
  return dispatch(fetchPage(repoURL, nextPage(getState()), accessToken)).then(() => {
    if (nextPage(getState())) {
      return chainFetchPage(dispatch, getState, repoURL)
    }
  })
}
