jest.unmock("../clone")

import thunk from "redux-thunk"
import configureStore from "redux-mock-store"

import clone from "../clone"

import setClonePath from "../setClonePath"
import setCloneStatus from "../setCloneStatus"
import setCloneProgress from "../setCloneProgress"
import { clone as cloneRepository } from "../../../../lib/cloneutils"
import { getClonePath } from "../../../../lib/pathutils"

const mockStore = configureStore([thunk])

describe("Clone Action", () => {
  let mockSubmission
  let mockSetClonePathAction
  let mockSetCloneStatusAction
  let mockClonePath
  let store

  const clearMocks = () => {
    [
      setClonePath,
      setCloneStatus,
      getClonePath,
      cloneRepository
    ].forEach(mock => mock.mockClear())
  }

  beforeEach(() => {
    mockSubmission = {
      id: 1,
      username: "StudentEvelyn",
      displayName: "Evelyn",
      avatarUrl: "https://avatars.githubusercontent.com/u/16492679?v=3&size=96",
      repoUrl: "http://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentEvelyn",
      selected: true,
      clonePath: "",
      cloneStatus: "",
      cloneProgress: 0
    }

    mockSetClonePathAction = {
      type: "MOCK_SET_CLONE_PATH"
    }

    mockSetCloneStatusAction = {
      type: "MOCK_SET_CLONE_STATUS"
    }

    mockClonePath = "/some/clone/path"

    setClonePath.mockReturnValue(mockSetClonePathAction)
    setCloneStatus.mockReturnValue(mockSetCloneStatusAction)
    getClonePath.mockReturnValue(mockClonePath)
    cloneRepository.mockReturnValue(new Promise((resolve, reject) => resolve()))

    store = mockStore({})
  })

  afterEach(clearMocks)

  it("dispatches an action to set the clone path of a submission", (done) => {
    store.dispatch(clone(mockSubmission)).then(() => {
      expect(setClonePath.mock.calls.length).toBe(1)
      expect(setClonePath.mock.calls[0]).toEqual([mockSubmission.id, mockClonePath])
      expect(store.getActions()[0]).toBe(mockSetClonePathAction)
      done()
    })
  })

  it("dispatches an action to set the clone status of a submission", (done) => {
    store.dispatch(clone(mockSubmission)).then(() => {
      expect(setCloneStatus.mock.calls.length).toBe(1)
      expect(setCloneStatus.mock.calls[0][0]).toEqual(mockSubmission.id)
      expect(store.getActions()[1]).toBe(mockSetCloneStatusAction)

      done()
    })
  })

  it("calls git clone API with correct arguments", (done) => {
    store.dispatch(clone(mockSubmission)).then(() => {
      expect(cloneRepository.mock.calls.length).toBe(1)
      expect(cloneRepository.mock.calls[0][0]).toBe(mockSubmission.repoUrl)
      expect(cloneRepository.mock.calls[0][1]).toBe(mockClonePath)

      done()
    })
  })

  it("dispatches an action to update the clone status when an error occurs", (done) => {
    cloneRepository.mockClear()
    cloneRepository.mockReturnValueOnce(new Promise((resolve, reject) => reject()))

    store.dispatch(clone(mockSubmission)).then(() => {
      expect(setCloneStatus.mock.calls.length).toBe(2)

      expect(setCloneStatus.mock.calls[0][0]).toBe(mockSubmission.id)
      expect(setCloneStatus.mock.calls[1][0]).toBe(mockSubmission.id)
      expect(setCloneStatus.mock.calls[1][1].indexOf("error")).not.toBe(-1)

      done()
    })
  })

  it("dispatches an action to update the clone progress when callbacks are fired by 'clone'", (done) => {
    cloneRepository.mockClear()
    cloneRepository.mockImplementation((repo, destination, progress) => {
      return new Promise((resolve, reject) => {
        progress(0)
        progress(30)
        progress(100)
        resolve()
      })
    })

    setCloneProgress.mockReturnValue({
      type: "MOCK_SUBMISSION_SET_CLONE_PROGRESS"
    })

    store.dispatch(clone(mockSubmission)).then(() => {
      expect(setCloneProgress.mock.calls.length).toBe(3)
      expect(setCloneProgress.mock.calls[0][1]).toBe(0)
      expect(setCloneProgress.mock.calls[1][1]).toBe(30)
      expect(setCloneProgress.mock.calls[2][1]).toBe(100)

      done()
    })
  })
})
