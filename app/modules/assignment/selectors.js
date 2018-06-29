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
  (assignment) => assignment.name
)

export const url = createSelector(
  all,
  (assignment) => assignment.url
)
