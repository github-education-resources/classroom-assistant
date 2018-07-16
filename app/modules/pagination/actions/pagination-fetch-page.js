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
      // Set next page to null, unless we got the header
      let nextPage = null

      if (response.headers.get("Link")) {
        const link = LinkHeader.parse(response.headers.get("Link"))
        if (link.has("rel", "next") && link.get("rel", "next").length > 0) {
          nextPage = link.get("rel", "next")[0].params.page
        }
      }

      dispatch(paginationSetNextPage(nextPage))
      return response.json()
    }).then((json) => {
      dispatch(paginationReceivePage(json))
      dispatch(submissionCreate(json))
    })
  }
}
