import { expect } from "chai"
import { paginationReceivePage } from "../pagination-receive-page"
import { PAGINATION_RECEIVE_PAGE } from "../../constants"

const repos = [
  { id: 1 },
  { id: 2 },
]
describe("paginationReceivePage", () => {
  it("creates action with all repo ids", () => {
    expect(paginationReceivePage(repos)).eql({
      type: PAGINATION_RECEIVE_PAGE,
      repoIds: [1, 2],
    })
  })
})
