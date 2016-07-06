/* eslint-env mocha */

import { assert } from "chai"
import { SUBMISSION_SELECT } from "../app/modules/submissions/constants"
import { submissionSelect } from "../app/modules/submissions/actions/submission-select"

describe("actions", () => {
  it("should create an action to select an item", () => {
    const id = 1
    const expectedAction = {
      type: SUBMISSION_SELECT,
      id: id
    }

    assert.deepEqual(expectedAction, submissionSelect(id))
  })
})
