import {PAGINATION_REQUEST} from "../constants"

export const requestPage = (page) => {
  return {
    type: PAGINATION_REQUEST,
    id: page,
  }
}
