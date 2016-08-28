import * as actionTypes from "../actionTypes"

const select = (id) => {
  return {
    type: actionTypes.SELECT,
    id: id
  }
}

export default select
