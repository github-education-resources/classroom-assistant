jest.unmock("../submission-clone-all")

import thunk from "redux-thunk"
import configureStore from "redux-mock-store"

import { submissionCloneAll } from "../submission-clone-all"
import { submissionClone } from "../submission-clone"
import { selected } from "../../selectors"

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe("submissionCloneAll", () => {
  it("dispatches submissionClone for every selected submission", (done) => {
    const mockState = {
      mockKey: "mockVal"
    }

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

    const store = mockStore(mockState)

    selected.mockReturnValueOnce([mockSubmission])

    submissionClone.mockReturnValueOnce((dispatch, getState) => {
      return new Promise((resolve, reject) => resolve())
    })

    store.dispatch(submissionCloneAll()).then(() => {
      expect(selected.mock.calls[0][0]).toEqual(mockState)

      expect(submissionClone.mock.calls.length).toBe(1)
      expect(submissionClone.mock.calls[0][0]).toEqual(mockSubmission)

      done()
    })
  })
})
