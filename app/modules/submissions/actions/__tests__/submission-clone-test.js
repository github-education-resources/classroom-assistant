import { expect } from "chai"
import * as sinon from "sinon"

import { submissionCloneFunc } from "../submission-clone"

import { clone } from "../../../../lib/cloneutils"

describe("submissionClone", () => {
  let mockSubmission
  // let mockSetClonePathAction

  const mockClonePath = "/some/clone/path"

  beforeEach(() => {
    mockSubmission = {
      id: 1,
      username: "StudentEvelyn",
      displayName: "Evelyn",
      avatarUrl: "https://avatars.githubusercontent.com/u/16492679?v=3&size=96",
      repoUrl: "http://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentEvelyn",
      selected: true,
      clonePath: "",
      cloneStatus: "",
      cloneProgress: 0
    }
  })

  it("dispatches an action to set the clone path of a submission", async () => {
    const getState = () => ({ settings: { cloneDestination: mockClonePath }, assignment: { type: "individual" } })
    const dispatch = sinon.spy()
    const submissionClone = submissionCloneFunc(clone)
    await submissionClone(mockSubmission)(dispatch, getState)

    expect(dispatch.calledWithMatch({ type: "SUBMISSION_SET_CLONE_PATH", id: 1 })).is.true
  })

  it("dispatches an action to set the clone status of a submission", async () => {
    const getState = () => ({ settings: { cloneDestination: mockClonePath }, assignment: { type: "individual" } })
    const dispatch = sinon.spy()
    const submissionClone = submissionCloneFunc(clone)
    await submissionClone(mockSubmission)(dispatch, getState)

    expect(dispatch.calledWithMatch({ type: "SUBMISSION_SET_CLONE_STATUS", id: 1 })).is.true
  })

  it("calls 'clone' helper utility with correct arguments", async () => {
    const cloneMock = sinon.spy(() => {
      return Promise.reject(new Error("something went wrong"))
    })

    const getState = () => ({ settings: { cloneDestination: mockClonePath }, assignment: { type: "individual" } })
    const dispatch = sinon.spy()

    const submissionClone = submissionCloneFunc(cloneMock)
    await submissionClone(mockSubmission)(dispatch, getState)

    // ignoring the second argument because we no longer mock the current Date
    expect(cloneMock.calledWithMatch("http://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentEvelyn")).is.true
  })

  it("dispatches an action to update the clone status when an error occurs", async () => {
    const getState = () => ({ settings: { cloneDestination: mockClonePath }, assignment: { type: "individual" } })
    const dispatch = sinon.spy()
    const submissionClone = submissionCloneFunc(clone)
    await submissionClone(mockSubmission)(dispatch, getState)

    expect(dispatch.calledWithMatch({ type: "SUBMISSION_SET_CLONE_STATUS", id: 1, cloneStatus: "Clone failed: an error has occured." })).is.true
  })

  it("dispatches an action to update the clone progress when callbacks are fired by 'clone'", async () => {
    const cloneMock = function (repo, destination, progress) {
      return new Promise((resolve, reject) => {
        progress(0)
        progress(30)
        progress(100)
        resolve()
      })
    }

    const getState = () => ({ settings: { cloneDestination: mockClonePath }, assignment: { type: "individual" } })
    const dispatch = sinon.spy()
    const submissionClone = submissionCloneFunc(cloneMock)
    await submissionClone(mockSubmission)(dispatch, getState)

    expect(dispatch.calledWithMatch({ type: "SUBMISSION_SET_CLONE_PROGRESS", id: 1, cloneProgress: 0 })).is.true
    expect(dispatch.calledWithMatch({ type: "SUBMISSION_SET_CLONE_PROGRESS", id: 1, cloneProgress: 30 })).is.true
    expect(dispatch.calledWithMatch({ type: "SUBMISSION_SET_CLONE_PROGRESS", id: 1, cloneProgress: 100 })).is.true
  })
})
