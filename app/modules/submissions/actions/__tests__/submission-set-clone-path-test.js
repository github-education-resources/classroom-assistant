import { expect } from "chai"

import { submissionSetClonePath } from "../submission-set-clone-path"
import { SUBMISSION_SET_CLONE_PATH } from "../../constants"

describe("submissionSetClonePath", () => {
  const TEST_ID = 1234
  const TEST_PATH = "/some/new/path"

  it("creates action with correct id", () => {
    expect(submissionSetClonePath(TEST_ID, TEST_PATH).id).to.equal(TEST_ID)
  })

  it("creates action with correct type", () => {
    expect(submissionSetClonePath(TEST_ID, TEST_PATH).type).to.equal(SUBMISSION_SET_CLONE_PATH)
  })

  it("creates action with correct clonePath", () => {
    expect(submissionSetClonePath(TEST_ID, TEST_PATH).clonePath).to.equal(TEST_PATH)
  })
})
