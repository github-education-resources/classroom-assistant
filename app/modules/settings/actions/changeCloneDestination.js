import * as actionTypes from "../actionTypes"

const changeCloneDestination = (destination) => ({
  type: actionTypes.CHANGE_CLONE_DESTINATION,
  destination: destination
})

export default changeCloneDestination
