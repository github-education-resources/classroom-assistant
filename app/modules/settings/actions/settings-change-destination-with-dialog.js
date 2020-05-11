import { settingsChangeCloneDestination } from "./settings-change-clone-destination"

import { remote } from "electron"
const dialog = remote.dialog

const showPickDestinationDialog = () => {
  return new Promise((resolve, reject) => {
    return dialog.showOpenDialog({
      properties: ["openDirectory"]
    }).then((openDialogResult) => {
      if (openDialogResult.canceled) {
        resolve(null)
      }
      const paths = openDialogResult.filePaths
      if (paths !== undefined) {
        resolve(paths[0])
      } else {
        resolve(paths)
      }
    })
  })
}

export const settingsChangeDestinationWithDialog = () => {
  return (dispatch, getState) => {
    showPickDestinationDialog().then((path) => {
      if (path) {
        dispatch(settingsChangeCloneDestination(path))
      }
    })
  }
}
