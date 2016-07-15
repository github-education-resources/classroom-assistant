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
