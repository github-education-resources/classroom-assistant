jest.unmock("../pathutils")

import { getClonePath } from "../pathutils"
import dateFormat from "dateformat"

const TEST_BASE_PATH = "/some/base/path"
const TEST_ASSIGNMENT_NAME = "SomeAssignment"
const TEST_STUDENT_USERNAME = "SomeStudentUsername"
const TEST_FORMATTED_DATE = "09-26-1985-09-00-00"

describe("Path Utilities", () => {
  describe("getClonePath", () => {
    it("creates the correct path for cloning", () => {
      dateFormat.mockReturnValueOnce(TEST_FORMATTED_DATE)

      expect(getClonePath(
        TEST_BASE_PATH,
        TEST_ASSIGNMENT_NAME,
        TEST_STUDENT_USERNAME
      )).toEqual(
        `${TEST_BASE_PATH}/${TEST_ASSIGNMENT_NAME}-${TEST_FORMATTED_DATE}/${TEST_STUDENT_USERNAME}`
      )
    })
  })
})
