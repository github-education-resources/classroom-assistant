import {paginationReceivePage} from "./pagination-receive-page"
import {paginationSetNextPage} from "./pagination-set-next-page"
import {submissionCreate} from "../../submissions/actions/submission-create"
import LinkHeader from "http-link-header"

const http = require("http")

/**
 * PUBLIC: Fetch single page of assignments given page number and assignment repo url
 *
 * @return An asynchronous thunk action
 */
export const fetchPage = (repoURL, page, accessToken) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      http.get(`${repoURL}?page=${page}&access_token=${accessToken}`, (response) => {
        // Set next page to null, unless we got the header
        let nextPage = null
        let body = ""

        if (response.headers["link"]) {
          const link = LinkHeader.parse(response.headers["link"])
          if (link.has("rel", "next") && link.get("rel", "next").length > 0) {
            nextPage = link.get("rel", "next")[0].params.page
          }
        }
        dispatch(paginationSetNextPage(nextPage))

        response.on("data", (chunk) => {
          body += chunk.toString()
        })

        response.on("end", () => {
          const json = JSON.parse(body)
          dispatch(paginationReceivePage(json))
          dispatch(submissionCreate(json))
          resolve()
        })

        response.on("error", function (err) {
          reject(err)
        })
      })
    })
  }
}
