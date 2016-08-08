jest.unmock("../submission-set-clone-path")
import { submissionSetClonePath } from "../submission-set-clone-path"
import { SUBMISSION_SET_CLONE_PATH } from "../../constants"

describe("submissionSetClonePath", () => {
  const TEST_ID = 1234
  const TEST_PATH = "/some/new/path"

  it("creates action with correct id", () => {
    expect(submissionSetClonePath(TEST_ID, TEST_PATH).id).toEqual(TEST_ID)
  })

  it("creates action with correct type", () => {
    expect(submissionSetClonePath(TEST_ID, TEST_PATH).type).toEqual(SUBMISSION_SET_CLONE_PATH)
  })

  it("creates action with correct clonePath", () => {
    expect(submissionSetClonePath(TEST_ID, TEST_PATH).clonePath).toEqual(TEST_PATH)
  })
})
