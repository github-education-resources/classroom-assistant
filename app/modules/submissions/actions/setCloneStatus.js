import * as actionTypes from "../actionTypes"

const setCloneStatus = (id, cloneStatus) => {
  return {
    type: actionTypes.SET_CLONE_STATUS,
    id,
    cloneStatus
  }
}

export default setCloneStatus
