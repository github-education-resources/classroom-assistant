import opener from "opener"

import { all } from "../selectors"

// PUBLIC: opens up system file viewer for the cloned submission of given id.
const viewDirectory = (id) => {
  return (dispatch, getState) => {
    const candidates = all(getState()).filter(each => each.id === id)
    if (candidates.length > 1) {
      throw new Error(`More than one submission found with id: ${id}`)
    } else if (candidates.length === 0) {
      throw new Error(`No submissions found with this id: ${id}`)
    } else {
      const submission = candidates[0]
      if (submission.clonePath !== "") {
        opener(submission.clonePath)
      }
    }
  }
}

export default viewDirectory
