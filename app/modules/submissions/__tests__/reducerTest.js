jest.unmock("../reducer")

import reducer from "../reducer"
import * as actionTypes from "../actionTypes"

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

describe("Submissions Reducer", () => {
  describe("changing submission clone progress", () => {
    it("changes progress of the right submission", () => {
      const action = {
        type: actionTypes.SET_CLONE_PROGRESS,
        id: maxSelected.id,
        cloneProgress: 60
      }

      const expected = [maxSelectedProgressSixty]
      const actual = reducer([maxSelected], action)

      expect(actual).toEqual(expected)
    })

    it("doesn't change progress of submissions with different ids", () => {
      const action = {
        type: actionTypes.SET_CLONE_PROGRESS,
        id: maxSelected.id,
        cloneProgress: 60
      }

      const expected = [evelynSelected]
      const actual = reducer([evelynSelected], action)

      expect(actual).toEqual(expected)
    })
  })

  describe("toggling selection of submissions", () => {
    it("selects a non-selected submission", () => {
      const action = {
        type: actionTypes.SELECT,
        id: evelynSelected.id
      }

      const expected = [evelynSelected]
      const actual = reducer([evelynNotSelected], action)

      expect(actual).toEqual(expected)
    })

    it("unselects a selected submission", () => {
      const action = {
        type: actionTypes.SELECT,
        id: evelynSelected.id
      }

      const expected = [evelynNotSelected]
      const actual = reducer([evelynSelected], action)

      expect(actual).toEqual(expected)
    })

    it("does not change the state of a submission with non-matching id", () => {
      const action = {
        type: actionTypes.SELECT,
        id: evelynSelected.id
      }

      let expected = [maxSelected]
      let actual = reducer([maxSelected], action)

      expect(actual).toEqual(expected)

      expected = [maxNotSelected]
      actual = reducer([maxNotSelected], action)

      expect(actual).toEqual(expected)
    })
  })

  describe("selecting all submissions", () => {
    it("selects all unselected submissions", () => {
      const action = {
        type: actionTypes.SELECT_ALL,
        newValue: true
      }

      const expected = [evelynSelected, maxSelected]
      const actual = reducer([evelynNotSelected, maxNotSelected], action)

      expect(actual).toEqual(expected)
    })

    it("selects all already-selected submissions when newValue is true", () => {
      const action = {
        type: actionTypes.SELECT_ALL,
        newValue: true
      }

      const expected = [evelynSelected, maxSelected]
      const actual = reducer([evelynSelected, maxSelected], action)

      expect(actual).toEqual(expected)
    })

    it("deselects all selected submissions when newValue is false", () => {
      const action = {
        type: actionTypes.SELECT_ALL,
        newValue: false
      }

      const expected = [evelynNotSelected, maxNotSelected]
      const actual = reducer([evelynSelected, maxSelected], action)

      expect(actual).toEqual(expected)
    })

    it("deselects all already non-selected submissions when newValue is false", () => {
      const action = {
        type: actionTypes.SELECT_ALL,
        newValue: false
      }

      const expected = [evelynNotSelected, maxNotSelected]
      const actual = reducer([evelynNotSelected, maxNotSelected], action)

      expect(actual).toEqual(expected)
    })
  })

  describe("settings submission clone path", () => {
    it("changes the clone path of targeted submission", () => {
      const action = {
        type: actionTypes.SET_CLONE_PATH,
        id: maxSelected.id,
        clonePath: TEST_CLONE_PATH
      }

      const expected = [maxSelectedWithClonePath]
      const actual = reducer([maxSelected], action)

      expect(actual).toEqual(expected)
    })
  })

  describe("setting submission clone status", () => {
    it("changes the status of targeted submission", () => {
      const action = {
        type: actionTypes.SET_CLONE_STATUS,
        id: maxSelected.id,
        cloneStatus: TEST_STATUS
      }

      const expected = [maxSelectedWithCloneStatus]
      const actual = reducer([maxSelected], action)

      expect(actual).toEqual(expected)
    })
  })
})
