import { settingsSetUsername } from "./settings-set-username"
const {session} = require("electron").remote

const sessionCookieParams = {
  domain: ".github.com",
  name: "dotcom_user",
}
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
