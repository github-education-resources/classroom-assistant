jest.unmock("../submission-clone")

import thunk from "redux-thunk"
import configureStore from "redux-mock-store"

import { submissionClone } from "../submission-clone"

import { submissionSetClonePath } from "../submission-set-clone-path"
import { submissionSetCloneStatus } from "../submission-set-clone-status"
import { submissionSetCloneProgress } from "../submission-set-clone-progress"
import { clone } from "../../../../lib/cloneutils"
import { getClonePath } from "../../../../lib/pathutils"

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe("submissionClone", () => {
  let mockSubmission
  let mockSetClonePathAction
  let mockSetCloneStatusAction
  let mockClonePath
  let store

  const clearMocks = () => {
    [
      submissionSetClonePath,
      submissionSetCloneStatus,
      getClonePath,
      clone
    ].forEach(mock => {
      for (var p in mock) {
        if (typeof mock[p] === "function") {
          // its a function if you get here
          console.log(`found function: ${p}`)
        }
      }

      mock.mockClear()
    })
  }

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

    mockSetClonePathAction = {
      type: "MOCK_SET_CLONE_PATH"
    }

    mockSetCloneStatusAction = {
      type: "MOCK_SET_CLONE_STATUS"
    }

    mockClonePath = "/some/clone/path"

    submissionSetClonePath.mockReturnValue(mockSetClonePathAction)
    submissionSetCloneStatus.mockReturnValue(mockSetCloneStatusAction)
    getClonePath.mockReturnValue(mockClonePath)
    clone.mockReturnValue(new Promise((resolve, reject) => resolve()))

    store = mockStore({})
  })

  afterEach(clearMocks)

  it("dispatches an action to set the clone path of a submission", (done) => {
    store.dispatch(submissionClone(mockSubmission)).then(() => {
      expect(submissionSetClonePath.mock.calls.length).toBe(1)
      expect(submissionSetClonePath.mock.calls[0]).toEqual([mockSubmission.id, mockClonePath])
      expect(store.getActions()[0]).toBe(mockSetClonePathAction)
      done()
    })
  })

  it("dispatches an action to set the clone status of a submission", (done) => {
    store.dispatch(submissionClone(mockSubmission)).then(() => {
      expect(submissionSetCloneStatus.mock.calls.length).toBe(1)
      expect(submissionSetCloneStatus.mock.calls[0][0]).toEqual(mockSubmission.id)
      expect(store.getActions()[1]).toBe(mockSetCloneStatusAction)

      done()
    })
  })

  it("calls 'clone' helper utility with correct arguments", (done) => {
    store.dispatch(submissionClone(mockSubmission)).then(() => {
      expect(clone.mock.calls.length).toBe(1)
      expect(clone.mock.calls[0][0]).toBe(mockSubmission.repoUrl)
      expect(clone.mock.calls[0][1]).toBe(mockClonePath)

      done()
    })
  })

  it("dispatches an action to update the clone status when an error occurs", (done) => {
    clone.mockClear()
    clone.mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error("something went wrong"))))

    store.dispatch(submissionClone(mockSubmission)).then(() => {
      expect(submissionSetCloneStatus.mock.calls.length).toBe(2)

      expect(submissionSetCloneStatus.mock.calls[0][0]).toBe(mockSubmission.id)
      expect(submissionSetCloneStatus.mock.calls[1][0]).toBe(mockSubmission.id)
      expect(submissionSetCloneStatus.mock.calls[1][1].indexOf("error")).not.toBe(-1)

      done()
    })
  })

  it("dispatches an action to update the clone progress when callbacks are fired by 'clone'", (done) => {
    clone.mockClear()
    clone.mockImplementation((repo, destination, progress) => {
      return new Promise((resolve, reject) => {
        progress(0)
        progress(30)
        progress(100)
        resolve()
      })
    })

    submissionSetCloneProgress.mockReturnValue({
      type: "MOCK_SUBMISSION_SET_CLONE_PROGRESS"
    })

    store.dispatch(submissionClone(mockSubmission)).then(() => {
      expect(submissionSetCloneProgress.mock.calls.length).toBe(3)
      expect(submissionSetCloneProgress.mock.calls[0][1]).toBe(0)
      expect(submissionSetCloneProgress.mock.calls[1][1]).toBe(30)
      expect(submissionSetCloneProgress.mock.calls[2][1]).toBe(100)

      done()
    })
  })
})
