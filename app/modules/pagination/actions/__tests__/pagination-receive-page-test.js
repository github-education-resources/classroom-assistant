import { expect } from "chai"
import { receivePage } from "../pagination-receive-page"
import { PAGINATION_RECEIVE } from "../../constants"

let repos = [
  {id: 1},
  {id: 2},
]
describe("paginationReceivePage", () => {
  it("creates action with page number and all repo ids", () => {
    expect(receivePage(1, repos)).eql({
      type: PAGINATION_RECEIVE,
      id: 1,
      repoIds: [1, 2],
    })
  })
})
