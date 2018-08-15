import keytar from "keytar"
import * as http from "http"

import { settingsSetUsername } from "./settings-set-username"
import { settingsLogoutUser } from "./settings-logout-user"

/**
 * PUBLIC: Update username in store based on token and redirect to populate page
 * if found
 *
 * @return async thunk action that resolves once set username is dispatched
 */
export const settingsFetchUserFromKeychain = () => {
  return dispatch => {
    return new Promise(async resolve => {
      const token = await tokenInKeychain()
      if (!token) {
        dispatch(settingsLogoutUser())
        resolve(null)
      }
      return fetchUser(token).then(username => {
        if (username) {
          dispatch(settingsSetUsername(username))
          resolve(username)
        }
        resolve(null)
      })
    })
  }
}

function fetchUser (token) {
  console.log(token)
  return new Promise(resolve => {
    http.get(`http://localhost:5000/api/internal/user?access_token=${token}`, (response) => {
      let body = ""

      response.on("data", (chunk) => {
        body += chunk.toString()
      })

      response.on("end", () => {
        const json = JSON.parse(body)
        if (json.username) {
          resolve(json.username)
        }
        resolve(null)
      })

      response.on("error", () => {
        resolve(null)
      })
    })
  })
}

async function tokenInKeychain () {
  try {
    return keytar.getPassword("Classroom-Desktop", "x-access-token")
  } catch (err) {
    return null
  }
}
