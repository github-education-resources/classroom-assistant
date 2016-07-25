import { push } from "react-router-redux"

import { selected } from "../selectors"
import { clone } from "../../../lib/cloneutils"
import { submissionReceiveCloneProgress } from "./submission-receive-clone-progress"

export const submissionClone = () => {
  return (dispatch, getState) => {
    dispatch(push("/archive"))

    const selectedSubmissions = selected(getState())

    selectedSubmissions.forEach((selectedSubmission) => {
      console.log(selectedSubmission.repoUrl)
      const destination = "/tmp/" + selectedSubmission.username
      clone(
        selectedSubmission.repoUrl,
        destination,
        (progress) => {
          dispatch(
            submissionReceiveCloneProgress(
              selectedSubmission.id,
              progress
            )
          )
        }
      ).then(() => {
        dispatch(
          submissionReceiveCloneProgress(
            selectedSubmission.id,
            100
          )
        )
        console.log("Clone complete")
      }).catch((err) => {
        console.log("An error has occured: " + err)
      })
    })
  }
}
