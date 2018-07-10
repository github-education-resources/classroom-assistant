import { SETTINGS_SET_AUTHORIZE } from "../constants"

export const settingsSetAuthorize = (value) => ({
  type: SETTINGS_SET_AUTHORIZE,
  payload: value
})
