import * as actionTypes from "../actionTypes"

const setClonePath = (id, clonePath) => {
  return {
    type: actionTypes.SET_CLONE_PATH,
    id,
    clonePath
  }
}

export default setClonePath
