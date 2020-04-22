import { expect } from "chai"
import * as sinon from "sinon"

import { submissionCloneAll } from "../submission-clone-all"

describe("submissionCloneAll", () => {
  it.skip("dispatches submissionClone for every selected submission", async () => {
    const mockSubmission = {
      id: 1,
      username: "StudentEvelyn",
      displayName: "Evelyn",
      avatarUrl: "https://avatars.githubusercontent.com/u/16492679?v=3&size=96",
      repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentEvelyn",
      selected: true,
      clonePath: "",
      cloneStatus: "",
      cloneProgress: 0
    }

    // TODO: this is the underlying clone stub but we can't get to it currently
    // because nested actions don't seem to work with the test harness
    const cloneMock = sinon.spy(() => {
      return Promise.reject(new Error("something went wrong"))
    })

    const getState = () => ({ submissions: [mockSubmission] })
    const dispatch = sinon.spy()
    await submissionCloneAll()(dispatch, getState)

    expect(cloneMock.calledWithMatch("https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentEvelyn")).is.true
  })
})
