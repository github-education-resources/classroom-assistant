import * as actionTypes from "../actionTypes"

const selectAll = (newValue) => {
  return {
    type: actionTypes.SELECT_ALL,
    newValue: newValue
  }
}

export default selectAll
