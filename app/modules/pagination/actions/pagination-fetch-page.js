import axios from "axios"
import LinkHeader from "http-link-header"

import { paginationReceivePage } from "./pagination-receive-page"
import { paginationSetNextPage } from "./pagination-set-next-page"
import { submissionCreate } from "../../submissions/actions/submission-create"

/**
 * PUBLIC: Fetch single page of assignments given page number and assignment repo url
 *
 * @return An asynchronous thunk action
 */
export const fetchPage = (repoURL, page, accessToken) => {
  return async dispatch => {
    const response = await axios.get(`${repoURL}?page=${page}&access_token=${accessToken}`)

    let nextPage = null

    if (response.headers.link) {
      const link = LinkHeader.parse(response.headers.link)
      if (link.has("rel", "next") && link.get("rel", "next").length > 0) {
        nextPage = link.get("rel", "next")[0].params.page
      }
    }
    dispatch(paginationSetNextPage(nextPage))

    dispatch(paginationReceivePage(response.data))
    dispatch(submissionCreate(response.data))
  }
}
