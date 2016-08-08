import { SETTINGS_CHANGE_CLONE_DESTINATION } from "../constants"

export const settingsChangeCloneDestination = (destination) => ({
  type: SETTINGS_CHANGE_CLONE_DESTINATION,
  destination: destination
})
