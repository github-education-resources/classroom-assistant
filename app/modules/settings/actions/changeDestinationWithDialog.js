import { remote } from "electron"
const dialog = remote.dialog

import changeCloneDestination from "./changeCloneDestination"

const showPickDestinationDialog = () => {
  return new Promise((resolve, reject) => {
    return dialog.showOpenDialog({
      properties: ["openDirectory"]
    }, (paths) => {
      if (paths !== undefined) {
        resolve(paths[0])
      } else {
        resolve(paths)
      }
    })
  })
}

const changeDestinationWithDialog = () => {
  return (dispatch, getState) => {
    showPickDestinationDialog().then((path) => {
      if (path) {
        dispatch(changeCloneDestination(path))
      }
    })
  }
}

export default changeDestinationWithDialog
