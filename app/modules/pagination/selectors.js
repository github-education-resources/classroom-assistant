import { createSelector } from "reselect"

export const paginationSelector = (state) => state.pagination
export const assignmentSelector = (state) => state.assignment

export const isPageLeft = createSelector(
  paginationSelector,
  (pagination) => {
    var pages = pagination.pages
    return pages.length === 0 || pages[pages.length - 1].nextPageId !== undefined
  }
)

export const nextPage = createSelector(
  paginationSelector,
  (pagination) => pagination.nextPage
)

export const outOfDate = createSelector(
  paginationSelector,
  assignmentSelector,
  (pagination, assignment) => {
    console.log(pagination.url)
    console.log(assignment.url)
    return (pagination.url !== assignment.url)
  }
)

export const fetching = createSelector(
  paginationSelector,
  (pagination) => pagination.fetching
)
