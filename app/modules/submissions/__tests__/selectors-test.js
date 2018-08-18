import { expect } from "chai"

import { all, num, selected, numSelected, areAllSelected } from "../selectors"

describe("selectors", () => {
  const evelyn = {
    id: 1,
    username: "StudentEvelyn",
    displayName: "Evelyn",
    avatarUrl: "https://avatars.githubusercontent.com/u/16492679?v=3&size=96",
    repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentEvelyn",
    selected: true,
    progress: 30
  }

  const max = {
    id: 2,
    username: "StudentMax",
    displayName: "Max",
    avatarUrl: "https://avatars.githubusercontent.com/u/16492576?v=3&size=96",
    repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentMax",
    selected: false,
    progress: 50
  }

  const ali = {
    id: 4,
    username: "StudentAli",
    displayName: "Ali",
    avatarUrl: "https://avatars.githubusercontent.com/u/16492425?v=3&size=96",
    repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentAli",
    selected: true,
    progress: 100
  }

  const mixedList = [evelyn, max]
  const allSelectedList = [evelyn, ali]

  describe("all", () => {
    it("extracts the submissions object from the state", () => {
      expect(all({
        submissions: mixedList
      })).eql(mixedList)
    })
  })

  describe("num", () => {
    it("returns the number of submissions", () => {
      expect(num({
        submissions: mixedList
      })).to.equal(2)
    })
  })

  describe("selected", () => {
    it("filters out nonselected submissions", () => {
      expect(selected({
        submissions: mixedList
      })).eql([evelyn])
    })
  })

  describe("numSelected", () => {
    it("returns the number of selected submissions", () => {
      expect(numSelected({
        submissions: mixedList
      })).to.equal(1)
    })
  })

  describe("areAllSelected", () => {
    it("returns true when all submissions are selected", () => {
      expect(areAllSelected({
        submissions: allSelectedList
      })).to.equal(true)
    })

    it("returns true when all submissions are selected", () => {
      expect(areAllSelected({
        submissions: mixedList
      })).to.equal(false)
    })
  })
})
