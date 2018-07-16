import { settingsSetUsername } from "./settings-set-username"
const {session} = require("electron").remote

// Params for reading session cookie that GitHub stores
const sessionCookieParams = {
  domain: ".github.com",
  name: "dotcom_user",
}

/**
 * PUBLIC: Update username in store based on GitHub Session Cookie
 * Sets to null if cookie is not found
 *
 * @return async thunk action that resolves once set username is dispatched
 */
export const settingsUpdateUserState = () => {
  return dispatch => {
    var username = null
    session.defaultSession.cookies.get(sessionCookieParams, (error, cookies) => {
      if (cookies.length > 0 && !error) {
        username = cookies[0].value
      }
      dispatch(settingsSetUsername(username))
    })
  }
}
