import { createSelector } from "reselect"

export const all = (state) => state.assignment

export const typeLabel = createSelector(
  all,
  (assignment) => {
    if (assignment.type === "individual") {
      return "Individual Assignment"
    } else if (assignment.type === "group") {
      return "Group Assignment"
    } else {
      return "Unknown Assignment Type"
    }
  }
)

export const name = createSelector(
  all,
  (assignment) => assignment.title
)

export const url = createSelector(
  all,
  (assignment) => assignment.url
)

export const error = createSelector(
  all,
  (assignment) => assignment.error
)

export const fetching = createSelector(
  all,
  (assignment) => assignment.isFetching
)

export const valid = createSelector(
  all,
  (assignment) => Boolean(!assignment.error && assignment.title && assignment.type)
)
