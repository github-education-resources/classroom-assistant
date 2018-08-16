import { expect } from "chai"
import * as sinon from "sinon"

import { submissionCloneFunc } from "../submission-clone"
import { clone } from "../../../../lib/cloneutils"

const nock = require("nock")
const keytar = require("keytar")

describe("submissionClone", () => {
  describe("#submissionCloneFunc", () => {
    let getState, dispatch

    const mockSubmission = {
      id: 1,
      username: "StudentEvelyn",
      displayName: "Evelyn",
      cloneStatus: "",
      cloneProgress: 0
    }

    const mockAssignment = {
      title: "Test Assignment",
      type: "individual",
      url: "http://classroom.github.com/classrooms/test-org/assignments/test-assignment",
      isFetching: false,
      error: null,
    }

    const mockSettings = {
      cloneDestination: "/some/clone/path"
    }

    beforeEach(() => {
      dispatch = sinon.spy()
      sinon.stub(keytar, "findPassword").returns("token")

      getState = () => ({
        settings: mockSettings,
        assignment: mockAssignment,
      })

      nock("http://classroom.github.com")
        .get("/api/internal/classrooms/test-org/assignments/test-assignment/assignment_repos/1/clone_url")
        .query({access_token: "token"})
        .reply(200, {
          temp_clone_url: "https://testuser:@github.com/test-org/test-assignment"
        })
    })

    afterEach(() => {
      keytar.findPassword.restore()
    })

    it("dispatches an action to set the clone path of a submission", async () => {
      const submissionClone = submissionCloneFunc(clone)
      await submissionClone(mockSubmission)(dispatch, getState)

      expect(dispatch.calledWithMatch({ type: "SUBMISSION_SET_CLONE_PATH", id: 1 })).is.true
    })

    it("dispatches an action to set the clone status of a submission", async () => {
      const submissionClone = submissionCloneFunc(clone)
      await submissionClone(mockSubmission)(dispatch, getState)

      expect(dispatch.calledWithMatch({ type: "SUBMISSION_SET_CLONE_STATUS", id: 1 })).is.true
    })

    it("calls 'clone' helper utility with correct arguments", async () => {
      const cloneMock = sinon.spy(() => {
        return Promise.reject(new Error("something went wrong"))
      })

      const submissionClone = submissionCloneFunc(cloneMock)
      await submissionClone(mockSubmission)(dispatch, getState)

      // ignoring the second argument because we no longer mock the current Date
      expect(cloneMock.calledWithMatch("https://github.com/test-org/test-assignment")).is.true
    })

    it("dispatches an action to update the clone status when an error occurs", async () => {
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

      const submissionClone = submissionCloneFunc(cloneMock)
      await submissionClone(mockSubmission)(dispatch, getState)

      expect(dispatch.calledWithMatch({ type: "SUBMISSION_SET_CLONE_PROGRESS", id: 1, cloneProgress: 0 })).is.true
      expect(dispatch.calledWithMatch({ type: "SUBMISSION_SET_CLONE_PROGRESS", id: 1, cloneProgress: 30 })).is.true
      expect(dispatch.calledWithMatch({ type: "SUBMISSION_SET_CLONE_PROGRESS", id: 1, cloneProgress: 100 })).is.true
    })
  })
})
