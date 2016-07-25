jest.unmock("../submissions")

import submissions from "../submissions"
import { SUBMISSION_SELECT, SUBMISSION_CHANGE_ALL } from "../../constants"

const evelynSelected = {
  id: 1,
  username: "StudentEvelyn",
  displayName: "Evelyn",
  avatarUrl: "https://avatars.githubusercontent.com/u/16492679?v=3&size=96",
  repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentEvelyn",
  selected: true,
  progress: 30
}

const evelynNotSelected = {
  id: 1,
  username: "StudentEvelyn",
  displayName: "Evelyn",
  avatarUrl: "https://avatars.githubusercontent.com/u/16492679?v=3&size=96",
  repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentEvelyn",
  selected: false,
  progress: 30
}

const maxSelected = {
  id: 2,
  username: "StudentMax",
  displayName: "Max",
  avatarUrl: "https://avatars.githubusercontent.com/u/16492576?v=3&size=96",
  repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentMax",
  selected: true,
  progress: 50
}

const maxNotSelected = {
  id: 2,
  username: "StudentMax",
  displayName: "Max",
  avatarUrl: "https://avatars.githubusercontent.com/u/16492576?v=3&size=96",
  repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentMax",
  selected: false,
  progress: 50
}

describe("submissions", () => {
  describe("SUBMISSION_SELECT", () => {
    it("selects a non-selected submission given SUBMISSION_SELECT", () => {
      const action = {
        type: SUBMISSION_SELECT,
        id: evelynSelected.id
      }

      expect(submissions([evelynNotSelected], action)).toEqual([evelynSelected])
    })

    it("unselects a selected submission given SUBMISSION_SELECT", () => {
      const action = {
        type: SUBMISSION_SELECT,
        id: evelynSelected.id
      }

      expect(submissions([evelynNotSelected], action)).toEqual([evelynSelected])
    })

    it("does not change the state of a submission with non-matching id", () => {
      const action = {
        type: SUBMISSION_SELECT,
        id: evelynSelected.id
      }

      expect(submissions([maxSelected], action)).toEqual([maxSelected])
      expect(submissions([maxNotSelected], action)).toEqual([maxNotSelected])
    })
  })

  describe("SUBMISSION_CHANGE_ALL", () => {
    it("selects all unselected submissions when newValue is true", () => {
      const action = {
        type: SUBMISSION_CHANGE_ALL,
        newValue: true
      }

      expect(submissions([evelynNotSelected, maxNotSelected], action)).toEqual([evelynSelected, maxSelected])
    })

    it("selects all already-selected submissions when newValue is true", () => {
      const action = {
        type: SUBMISSION_CHANGE_ALL,
        newValue: true
      }

      expect(submissions([evelynSelected, maxSelected], action)).toEqual([evelynSelected, maxSelected])
    })

    it("deselects all selected submissions when newValue is false", () => {
      const action = {
        type: SUBMISSION_CHANGE_ALL,
        newValue: false
      }

      expect(submissions([evelynSelected, maxSelected], action)).toEqual([evelynNotSelected, maxNotSelected])
    })

    it("deselects all already non-selected submissions when newValue is false", () => {
      const action = {
        type: SUBMISSION_CHANGE_ALL,
        newValue: false
      }

      expect(submissions([evelynNotSelected, maxNotSelected], action)).toEqual([evelynNotSelected, maxNotSelected])
    })
  })
})
