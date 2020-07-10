import { PAGINATION_SET_ASSIGNMENT_URL } from "../constants"

export const paginationSetAssignmentURL = (url) => {
  return {
    type: PAGINATION_SET_ASSIGNMENT_URL,
    url: url,
  }
}
