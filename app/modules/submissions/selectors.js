import { createSelector } from "reselect"

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
    let totalProgress = 0
    submissions.forEach(submission => {
      totalProgress += submission.cloneProgress
    })
    if (numSelected > 0) {
      return totalProgress / numSelected
    } else {
      return 100
    }
  }
)

export const cloneStatus = createSelector(
  selected,
  numSelected,
  (submissions, numSelected) => {
    if (progress(submissions, numSelected) === 100) {
      return "All submissions have been successfully cloned."
    } else {
      submissions.forEach(submission => {
        if (!submission.cloneStatus || submission.cloneStatus === "Cloning Submission...") {
          // Submissions still cloning
          return "Download Progress"
        }
      })
      return "All submissions have been processed. Some errors might have occured."
    }
  }
)
