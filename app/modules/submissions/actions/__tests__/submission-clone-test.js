jest.unmock("../submission-clone")

import thunk from "redux-thunk"
import configureStore from "redux-mock-store"

import { submissionClone } from "../submission-clone"

import { submissionSetClonePath } from "../submission-set-clone-path"
import { submissionSetCloneStatus } from "../submission-set-clone-status"
import { clone } from "../../../../lib/cloneutils"
import { getClonePath } from "../../../../lib/pathutils"

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe("submissionClone", () => {
  it("calls 'clone' and dispatches actions", (done) => {
    const mockSubmission = {
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

    const mockSetClonePathAction = {
      type: "MOCK_SET_CLONE_PATH"
    }

    submissionSetClonePath.mockReturnValueOnce(mockSetClonePathAction)

    const mockSetCloneStatusAction = {
      type: "MOCK_SET_CLONE_STATUS"
    }

    submissionSetCloneStatus.mockReturnValueOnce(mockSetCloneStatusAction)

    const mockClonePath = "/some/clone/path"

    getClonePath.mockReturnValueOnce(mockClonePath)

    clone.mockReturnValueOnce(new Promise((resolve, reject) => resolve()))

    const store = mockStore({})

    store.dispatch(submissionClone(mockSubmission)).then(() => {
      expect(submissionSetClonePath.mock.calls.length).toBe(1)
      expect(submissionSetClonePath.mock.calls[0]).toEqual([mockSubmission.id, mockClonePath])
      expect(store.getActions()[0]).toBe(mockSetClonePathAction)

      expect(submissionSetCloneStatus.mock.calls.length).toBe(1)
      expect(submissionSetCloneStatus.mock.calls[0][0]).toEqual(mockSubmission.id)
      expect(store.getActions()[1]).toBe(mockSetCloneStatusAction)

      expect(clone.mock.calls.length).toBe(1)
      expect(clone.mock.calls[0][0]).toBe(mockSubmission.repoUrl)
      expect(clone.mock.calls[0][1]).toBe(mockClonePath)

      done()
    })
  })
})
