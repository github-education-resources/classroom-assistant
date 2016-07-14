jest.unmock("../submissions")

import submissions from "../submissions"
import { SUBMISSION_SELECT } from "../../constants"

describe("submissions", () => {
  it("selects a non-selected submission given SUBMISSION_SELECT", () => {
    const initialState = [
      {
        id: 1,
        username: "StudentEvelyn",
        displayName: "Evelyn",
        avatarUrl: "https://avatars.githubusercontent.com/u/16492679?v=3&size=96",
        repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentEvelyn",
        selected: false,
        progress: 30
      }
    ]

    const expectedState = [
      {
        id: 1,
        username: "StudentEvelyn",
        displayName: "Evelyn",
        avatarUrl: "https://avatars.githubusercontent.com/u/16492679?v=3&size=96",
        repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentEvelyn",
        selected: true,
        progress: 30
      }
    ]

    const action = {
      type: SUBMISSION_SELECT,
      id: 1
    }

    expect(submissions(initialState, action)).toEqual(expectedState)
  })

  it("unselects a selected submission given SUBMISSION_SELECT", () => {
    const initialState = [
      {
        id: 1,
        username: "StudentEvelyn",
        displayName: "Evelyn",
        avatarUrl: "https://avatars.githubusercontent.com/u/16492679?v=3&size=96",
        repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentEvelyn",
        selected: true,
        progress: 30
      }
    ]

    const expectedState = [
      {
        id: 1,
        username: "StudentEvelyn",
        displayName: "Evelyn",
        avatarUrl: "https://avatars.githubusercontent.com/u/16492679?v=3&size=96",
        repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentEvelyn",
        selected: false,
        progress: 30
      }
    ]

    const action = {
      type: SUBMISSION_SELECT,
      id: 1
    }

    expect(submissions(initialState, action)).toEqual(expectedState)
  })

  it("does not change the state of a submission with non-matching id", () => {
    const initialState = [
      {
        id: 2,
        username: "StudentEvelyn",
        displayName: "Evelyn",
        avatarUrl: "https://avatars.githubusercontent.com/u/16492679?v=3&size=96",
        repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentEvelyn",
        selected: true,
        progress: 30
      }
    ]

    const expectedState = [
      {
        id: 2,
        username: "StudentEvelyn",
        displayName: "Evelyn",
        avatarUrl: "https://avatars.githubusercontent.com/u/16492679?v=3&size=96",
        repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentEvelyn",
        selected: true,
        progress: 30
      }
    ]

    const action = {
      type: SUBMISSION_SELECT,
      id: 1
    }

    expect(submissions(initialState, action)).toEqual(expectedState)
  })

  it("returns the correct initial state", () => {
    expect(submissions(undefined, {})).toEqual([{
      id: 1,
      username: "StudentEvelyn",
      displayName: "Evelyn",
      avatarUrl: "https://avatars.githubusercontent.com/u/16492679?v=3&size=96",
      repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentEvelyn",
      selected: true,
      progress: 30
    }, {
      id: 2,
      username: "StudentMax",
      displayName: "Max",
      avatarUrl: "https://avatars.githubusercontent.com/u/16492576?v=3&size=96",
      repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentMax",
      selected: true,
      progress: 50
    }, {
      id: 3,
      username: "StudentZi",
      displayName: "Zi",
      avatarUrl: "https://avatars.githubusercontent.com/u/16492482?v=3&size=96",
      repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentZi",
      selected: true,
      progress: 100
    }, {
      id: 4,
      username: "StudentAli",
      displayName: "Ali",
      avatarUrl: "https://avatars.githubusercontent.com/u/16492425?v=3&size=96",
      repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentAli",
      selected: true,
      progress: 100
    }, {
      id: 5,
      username: "StudentShay",
      displayName: "Shay",
      avatarUrl: "https://avatars.githubusercontent.com/u/16492375?v=3&size=96",
      repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentShay",
      selected: true,
      progress: 100
    }, {
      id: 6,
      username: "StudentZara",
      displayName: "Zara",
      avatarUrl: "https://avatars.githubusercontent.com/u/16479545?v=3&size=96",
      repoUrl: "https://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentZara",
      selected: true,
      progress: 100
    }])
  })
})
