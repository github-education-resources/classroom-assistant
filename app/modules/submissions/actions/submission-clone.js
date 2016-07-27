import { push } from "react-router-redux"

import { selected } from "../selectors"
import { clone } from "../../../lib/cloneutils"
import { submissionReceiveCloneProgress } from "./submission-receive-clone-progress"
import { cloneDestination } from "../../settings/selectors"
import { getClonePath } from "../../../lib/pathutils"
import { name } from "../../assignment/selectors"

export const submissionClone = () => {
  return (dispatch, getState) => {
    dispatch(push("/archive"))

    const selectedSubmissions = selected(getState())

    selectedSubmissions.forEach((selectedSubmission) => {
      const destination = getClonePath(
        cloneDestination(getState()),
        name(getState()),
        selectedSubmission.username
      )

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
      }).catch((err) => {
        console.log("An error has occured: " + err)
      })
    })
  }
}
