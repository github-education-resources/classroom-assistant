import {SELECT_ITEM} from "../constants/actionTypes"

export const selectItem = (id) => {
  return {
    type: SELECT_ITEM,
    id: id
  }
}
