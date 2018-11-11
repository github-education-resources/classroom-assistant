import { createSelector } from "reselect"
import {
  SUBMISSION_CLONE_SUCCESS,
  SUBMISSION_CLONE_IN_PROGRESS
} from "./constants"

export const all = state => state.submissions

export const num = createSelector(
  all,
  submissions => submissions.length
)

export const selected = createSelector(
  all,
  submissions => submissions.filter(each => each.selected)
)

export const numSelected = createSelector(
  selected,
  submissions => submissions.length
)

export const areAllSelected = createSelector(
  numSelected,
  num,
  (numSelected, num) => numSelected === num
)

export const progress = createSelector(
  selected,
  numSelected,
  (submissions, numSelected) => {
    if (numSelected < 1) {
      return 0
    }

    let totalProgress = 0
    let cloneComplete = true
    let cloneError = false

    submissions.forEach(submission => {
      if (submission.cloneStatus === SUBMISSION_CLONE_IN_PROGRESS) {
        cloneComplete = false
      } else if (!submission.cloneStatus && submission.cloneStatus !== SUBMISSION_CLONE_SUCCESS) {
        cloneError = true
      }
      totalProgress += submission.cloneProgress
    })
    const progressPercentage = totalProgress / numSelected

    if (cloneComplete && (cloneError || progressPercentage < 100)) {
      return -1
    } else {
      return progressPercentage
    }
  }
)
