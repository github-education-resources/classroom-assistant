import {paginationReceivePage} from "./pagination-receive-page"
import {paginationSetNextPage} from "./pagination-set-next-page"
import {submissionCreate} from "../../submissions/actions/submission-create"
import LinkHeader from "http-link-header"

/**
 * PUBLIC: Fetch single page of assignments given page number and assignment repo url
 *
 * @return An asynchronous thunk action
 */
export const fetchPage = (repoURL, page) => {
  return dispatch => {
    return fetch(`${repoURL}?page=${page}`, {
      credentials: "include"
    }).then(response => {
      dispatch(paginationSetNextPage(null)) // Set next page to null, unless we get header
      if (response.headers.get("Link")) {
        var link = LinkHeader.parse(response.headers.get("Link"))
        if (link.has("rel", "next") && link.get("rel", "next").length > 0) {
          dispatch(paginationSetNextPage(link.get("rel", "next")[0].params.page))
        }
      }
      return response.json()
    }).then((json) => {
      dispatch(paginationReceivePage(json))
      dispatch(submissionCreate(json))
    })
  }
}
