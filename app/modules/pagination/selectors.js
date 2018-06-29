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

export const nextPageId = createSelector(
  paginationSelector,
  (pagination) => {
    var pages = pagination.pages
    if (pages.length === 0) {
      return 1
    } else {
      return pages[pages.length - 1].nextPageId
    }
  }
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

export const fetchedAll = createSelector(
  paginationSelector,
  (pagination) => pagination.fetchedAll
)
