jest.unmock("../submission-select")
import { submissionSelect } from "../submission-select"
import { SUBMISSION_SELECT } from "../../constants"

describe("submissionSelect", () => {
  it("creates action with correct id", () => {
    expect(submissionSelect(1)).toEqual({
      type: SUBMISSION_SELECT,
      id: 1
    })
  })
})
