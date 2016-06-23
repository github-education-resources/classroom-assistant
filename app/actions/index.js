const SELECT_ITEM = "SELECT_ITEM"

export const selectItem = (id) => {
  return {
    type: SELECT_ITEM,
    id: id
  }
}
