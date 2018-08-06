export const cloneDestination = (state) => {
  return state.settings.cloneDestination
}

export const username = (state) => {
  return state.settings.username
}

export const loggedIn = (state) => {
  return Boolean(state.settings.username)
}
