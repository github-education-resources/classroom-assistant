import {receivePage} from "./pagination-receive-page"
import {requestPage} from "./pagination-request-page"
import {receiveMetadata} from "./pagination-receive-metadata"
import {submissionCreate} from "../../submissions/actions/submission-create"
import LinkHeader from "http-link-header"

export const fetchPage = (page, repoURL) => {
  return dispatch => {
    dispatch(requestPage(page))
    return fetch(`${repoURL}?page=${page}&per_page=1`, {
      credentials: "include"

    }).then(response => {
      // dispatch(receiveMetadata(page, ))
      if (response.headers.get("Link")) {
        var link = LinkHeader.parse(response.headers.get("Link"))
        console.log(link)
        if (link.has("rel", "next")) {
          dispatch(receiveMetadata(page, link.get("rel", "next")[0].uri))
        }
      }
      return response.json()
    }).then((data) => {
      dispatch(receivePage(page, data))
      data.forEach((repo) => {
        dispatch(submissionCreate(repo))
      })
      console.log(data)
    })
  }
}
