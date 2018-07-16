import { SETTINGS_SET_USERNAME } from "../constants"

export const settingsSetUsername = (username) => ({
  type: SETTINGS_SET_USERNAME,
  payload: username
})
