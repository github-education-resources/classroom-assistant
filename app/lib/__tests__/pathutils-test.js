import { expect } from "chai"

import { getAssignmentFolder, getClonePath } from "../pathutils"

const fs = require("fs-extra")

const RANDOM_FILENAME = (Math.random().toString(36) + "00000").substr(2, 5)
const TEST_BASE_PATH = "/tmp/" + RANDOM_FILENAME

const TEST_ASSIGNMENT_NAME = "SomeAssignment"
const TEST_STUDENT_USERNAME = "SomeStudentUsername"

describe("Path Utilities", () => {
  describe("getAssignmentFolder", () => {
    it("returns the correct path for the assignment", async () => {
      const folderPath = getAssignmentFolder(TEST_BASE_PATH, TEST_ASSIGNMENT_NAME)

      // Checks if path matches what we expect on either Linux or Windows
      const regex = /[/\\]tmp[/\\]\w{5}[/\\]SomeAssignment-\d{2}-\d{2}-\d{4}-\d{2}-\d{2}-\d{2}/g

      expect(regex.test(folderPath)).to.be.true
    })
  })

  describe("getClonePath", () => {
    it("returns the correct path for cloning", async () => {
      const assignmentPath = getAssignmentFolder(TEST_BASE_PATH, TEST_ASSIGNMENT_NAME)

      const clonePath = await getClonePath(assignmentPath, TEST_STUDENT_USERNAME)

      // Checks if path matches what we expect on either Linux or Windows
      const regex = /[/\\]tmp[/\\]\w{5}[/\\]SomeAssignment-\d{2}-\d{2}-\d{4}-\d{2}-\d{2}-\d{2}[/\\]SomeStudentUsername/g

      expect(regex.test(clonePath)).to.be.true
    })

    it("creates the folder for cloning", async () => {
      const assignmentPath = getAssignmentFolder(TEST_BASE_PATH, TEST_ASSIGNMENT_NAME)
      await fs.remove(assignmentPath)

      const clonePath = await getClonePath(assignmentPath, TEST_STUDENT_USERNAME)

      const folderPresent = await fs.exists(clonePath)

      expect(folderPresent).to.be.true
    })
  })
})
