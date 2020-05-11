import { PAGINATION_SET_NEXT_PAGE } from "../constants"

export const paginationSetNextPage = (nextPage = null) => {
  return {
    type: PAGINATION_SET_NEXT_PAGE,
    nextPage: nextPage,
  }
}
