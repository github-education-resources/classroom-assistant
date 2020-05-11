import { PAGINATION_RECEIVE_PAGE } from "../constants"

export const paginationReceivePage = (data) => {
  return {
    type: PAGINATION_RECEIVE_PAGE,
    repoIds: data.map((repo) => {
      return repo.id
    })
  }
}
