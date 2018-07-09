import { createSelector } from "reselect"

export const paginationSelector = (state) => state.pagination
export const assignmentSelector = (state) => state.assignment

export const nextPage = createSelector(
  paginationSelector,
  (pagination) => {
    return pagination.nextPage
  }
)

export const outOfDate = createSelector(
  paginationSelector,
  assignmentSelector,
  (pagination, assignment) => {
    return (pagination.assignmentURL !== assignment.url)
  }
)

export const fetching = createSelector(
  paginationSelector,
  (pagination) => pagination.fetching
)
