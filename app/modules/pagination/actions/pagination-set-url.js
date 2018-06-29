import {PAGINATION_SET_URL} from "../constants"

export const setURL = (url) => {
  return {
    type: PAGINATION_SET_URL,
    url: url,
  }
}
