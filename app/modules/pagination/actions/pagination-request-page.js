import {REQUEST_PAGE} from "../constants"

export const requestPage = (page) => {
  return {
    type: REQUEST_PAGE,
    id: page
  }
}
