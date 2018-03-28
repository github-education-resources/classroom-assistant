import { expect } from "chai"
import { submissionSelect } from "../submission-select"
import { SUBMISSION_SELECT } from "../../constants"

describe("submissionSelect", () => {
  it("creates action with correct id", () => {
    expect(submissionSelect(1)).eql({
      type: SUBMISSION_SELECT,
      id: 1
    })
  })
})
