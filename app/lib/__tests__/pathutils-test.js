import { expect } from "chai"

import { getClonePath } from "../pathutils"

const TEST_BASE_PATH = "/some/base/path"
const TEST_ASSIGNMENT_NAME = "SomeAssignment"
const TEST_STUDENT_USERNAME = "SomeStudentUsername"

describe("Path Utilities", () => {
  describe("getClonePath", () => {
    it("creates the correct path for cloning", () => {
      const folderPath = getClonePath(
        TEST_BASE_PATH,
        TEST_ASSIGNMENT_NAME,
        TEST_STUDENT_USERNAME
      )

      const regex = /\/some\/base\/path\/SomeAssignment-\d{2}-\d{2}-\d{4}\/SomeStudentUsername/g

      expect(regex.test(folderPath)).equals(true)
    })
  })
})
