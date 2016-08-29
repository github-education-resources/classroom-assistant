import * as actionTypes from "../actionTypes"

const setCloneProgress = (id, cloneProgress) => {
  return {
    type: actionTypes.SET_CLONE_PROGRESS,
    id,
    cloneProgress
  }
}

export default setCloneProgress
