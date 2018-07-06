import {PAGINATION_RECEIVE_PAGE} from "../constants"

export const paginationReceivePage = (page, data) => {
  return {
    type: PAGINATION_RECEIVE_PAGE,
    id: page,
    repoIds: data.map((repo) => {
      return repo.id
    })
  }
}
