export const metadataPresent = (state) => {
  return state.pagination.settings.cloneDestination
}

export const isPageLeft = (state) => {
  var pages = state.pagination.pages
  return pages.length === 0 || pages[pages.length - 1].nextPageId !== undefined
}

export const nextPageId = (state) => {
  var pages = state.pagination.pages
  if (pages.length === 0) {
    return 1
  } else {
    return pages[pages.length - 1].nextPageId
  }
}
