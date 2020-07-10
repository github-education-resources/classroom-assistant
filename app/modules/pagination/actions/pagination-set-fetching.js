import { PAGINATION_SET_FETCHING } from "../constants"

export const paginationSetFetching = (value) => {
  return {
    type: PAGINATION_SET_FETCHING,
    payload: value,
  }
}
