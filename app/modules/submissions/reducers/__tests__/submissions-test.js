import { expect } from "chai"

import submissions from "../submissions"
import {
  SUBMISSION_SELECT,
  SUBMISSION_SELECT_ALL,
  SUBMISSION_SET_CLONE_PROGRESS,
  SUBMISSION_SET_CLONE_PATH,
  SUBMISSION_SET_CLONE_STATUS
} from "../../constants"

const TEST_CLONE_PATH = "/some/clone/path"
const TEST_STATUS = "Some Status"

const evelynSelected = {
  id: 1,
  username: "StudentEvelyn",
  displayName: "Evelyn",
  avatarUrl: "https://avatars.githubusercontent.com/u/16492679?v=3&size=96",
  repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentEvelyn",
  selected: true,
  clonePath: "",
  cloneStatus: "",
  cloneProgress: 30
}

const evelynNotSelected = {
  id: 1,
  username: "StudentEvelyn",
  displayName: "Evelyn",
  avatarUrl: "https://avatars.githubusercontent.com/u/16492679?v=3&size=96",
  repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentEvelyn",
  selected: false,
  clonePath: "",
  cloneStatus: "",
  cloneProgress: 30
}

const maxSelected = {
  id: 2,
  username: "StudentMax",
  displayName: "Max",
  avatarUrl: "https://avatars.githubusercontent.com/u/16492576?v=3&size=96",
  repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentMax",
  selected: true,
  clonePath: "",
  cloneStatus: "",
  cloneProgress: 50
}

const maxSelectedWithClonePath = {
  id: 2,
  username: "StudentMax",
  displayName: "Max",
  avatarUrl: "https://avatars.githubusercontent.com/u/16492576?v=3&size=96",
  repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentMax",
  selected: true,
  clonePath: TEST_CLONE_PATH,
  cloneStatus: "",
  cloneProgress: 50
}

const maxSelectedWithCloneStatus = {
  id: 2,
  username: "StudentMax",
  displayName: "Max",
  avatarUrl: "https://avatars.githubusercontent.com/u/16492576?v=3&size=96",
  repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentMax",
  selected: true,
  clonePath: "",
  cloneStatus: TEST_STATUS,
  cloneProgress: 50
}

const maxSelectedProgressSixty = {
  id: 2,
  username: "StudentMax",
  displayName: "Max",
  avatarUrl: "https://avatars.githubusercontent.com/u/16492576?v=3&size=96",
  repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentMax",
  selected: true,
  clonePath: "",
  cloneStatus: "",
  cloneProgress: 60
}

const maxNotSelected = {
  id: 2,
  username: "StudentMax",
  displayName: "Max",
  avatarUrl: "https://avatars.githubusercontent.com/u/16492576?v=3&size=96",
  repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentMax",
  selected: false,
  clonePath: "",
  cloneStatus: "",
  cloneProgress: 50
}

describe("submissions", () => {
  describe("SUBMISSION_SET_CLONE_PROGRESS", () => {
    it("changes progress of the right submission", () => {
      const action = {
        type: SUBMISSION_SET_CLONE_PROGRESS,
        id: maxSelected.id,
        cloneProgress: 60
      }

      expect(submissions([maxSelected], action)).eql([maxSelectedProgressSixty])
    })

    it("doesn't change progress of submissions with different ids", () => {
      const action = {
        type: SUBMISSION_SET_CLONE_PROGRESS,
        id: maxSelected.id,
        cloneProgress: 60
      }

      expect(submissions([evelynSelected], action)).eql([evelynSelected])
    })
  })

  describe("SUBMISSION_SELECT", () => {
    it("selects a non-selected submission given SUBMISSION_SELECT", () => {
      const action = {
        type: SUBMISSION_SELECT,
        id: evelynSelected.id
      }

      expect(submissions([evelynNotSelected], action)).eql([evelynSelected])
    })

    it("unselects a selected submission given SUBMISSION_SELECT", () => {
      const action = {
        type: SUBMISSION_SELECT,
        id: evelynSelected.id
      }

      expect(submissions([evelynNotSelected], action)).eql([evelynSelected])
    })

    it("does not change the state of a submission with non-matching id", () => {
      const action = {
        type: SUBMISSION_SELECT,
        id: evelynSelected.id
      }

      expect(submissions([maxSelected], action)).eql([maxSelected])
      expect(submissions([maxNotSelected], action)).eql([maxNotSelected])
    })
  })

  describe("SUBMISSION_SELECT_ALL", () => {
    it("selects all unselected submissions when newValue is true", () => {
      const action = {
        type: SUBMISSION_SELECT_ALL,
        newValue: true
      }

      expect(submissions([evelynNotSelected, maxNotSelected], action)).eql([evelynSelected, maxSelected])
    })

    it("selects all already-selected submissions when newValue is true", () => {
      const action = {
        type: SUBMISSION_SELECT_ALL,
        newValue: true
      }

      expect(submissions([evelynSelected, maxSelected], action)).eql([evelynSelected, maxSelected])
    })

    it("deselects all selected submissions when newValue is false", () => {
      const action = {
        type: SUBMISSION_SELECT_ALL,
        newValue: false
      }

      expect(submissions([evelynSelected, maxSelected], action)).eql([evelynNotSelected, maxNotSelected])
    })

    it("deselects all already non-selected submissions when newValue is false", () => {
      const action = {
        type: SUBMISSION_SELECT_ALL,
        newValue: false
      }

      expect(submissions([evelynNotSelected, maxNotSelected], action)).eql([evelynNotSelected, maxNotSelected])
    })
  })

  describe("SUBMISSION_SET_CLONE_PATH", () => {
    it("changes the clone path of targeted submission", () => {
      const action = {
        type: SUBMISSION_SET_CLONE_PATH,
        id: maxSelected.id,
        clonePath: TEST_CLONE_PATH
      }

      expect(submissions([maxSelected], action)).eql([maxSelectedWithClonePath])
    })
  })

  describe("SUBMISSION_SET_CLONE_STATUS", () => {
    it("changes the status of targeted submission", () => {
      const action = {
        type: SUBMISSION_SET_CLONE_STATUS,
        id: maxSelected.id,
        cloneStatus: TEST_STATUS
      }

      expect(submissions([maxSelected], action)).eql([maxSelectedWithCloneStatus])
    })
  })
})
