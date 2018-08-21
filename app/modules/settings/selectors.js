export const cloneDestination = (state) => {
  return state.settings.cloneDestination
}

export const username = (state) => {
  return state.settings.username
}

export const userAuthorized = (state) => {
  return Boolean(state.settings.username)
}
