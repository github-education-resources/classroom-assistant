import {FETCHING_ALL_PAGES} from "../constants"

export const setFetchingAllPages = (val) => {
  return {
    type: FETCHING_ALL_PAGES,
    value: val,
  }
}
