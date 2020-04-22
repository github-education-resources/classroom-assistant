import { expect } from "chai"
import * as sinon from "sinon"

import { settingsResetState } from "../settings-reset-state"

import { assignmentReset } from "../../../assignment/actions/assignment-reset"
import { submissionReset } from "../../../submissions/actions/submission-reset"
import { paginationReset } from "../../../pagination/actions/pagination-reset"

describe("settingsResetState", () => {
  let dispatch

  beforeEach(() => {
    dispatch = sinon.stub()
    dispatch.resolves("")
  })

  afterEach(() => {
    dispatch = null
  })

  it("resets assignment", async () => {
    await settingsResetState()(dispatch)

    expect(dispatch.calledWithMatch(assignmentReset)).is.true
  })

  it("resets submissions", async () => {
    await settingsResetState()(dispatch)

    expect(dispatch.calledWithMatch(submissionReset)).is.true
  })

  it("resets pagination", async () => {
    await settingsResetState()(dispatch)

    expect(dispatch.calledWithMatch(paginationReset)).is.true
  })
})
