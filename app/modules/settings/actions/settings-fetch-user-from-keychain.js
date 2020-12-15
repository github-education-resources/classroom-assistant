import axios from "axios"

import { settingsSetUsername } from "./settings-set-username"
import { settingsLogoutUser } from "./settings-logout-user"
import { remote } from "electron"

/**
 * PUBLIC: Update username in store based on token and redirect to populate page
 * if found
 *
 * @return async thunk action that resolves once set username is dispatched
 */
export const settingsFetchUserFromKeychain = () => {
  return async dispatch => {
    try {
      const token = await tokenInKeychain()
      if (token) {
        const username = await fetchUsername(token)
        if (username) {
          dispatch(settingsSetUsername(username))
          return username
        }
      }
      dispatch(settingsLogoutUser())
      return null
    } catch (error) {
      dispatch(settingsLogoutUser())
      return null
    }
  }
}

/**
 * PUBLIC: Fetch username from Classroom API using Access Token
 * Resolves with token if found, else resolves with null
 *
 * @return async thunk action that resolves with username
 */
export const fetchUsername = async (token) => {
  try {
    const response = await axios.get(`/api/internal/user?access_token=${token}`)
    if (response.data.username) {
      return response.data.username
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}

const tokenInKeychain = async () => {
  const token = remote.getGlobal("accessToken")
  return token
}
