import { expect } from "chai"
import { paginationSetFetching } from "../pagination-set-fetching"
import { PAGINATION_SET_FETCHING } from "../../constants"

describe("paginationSetFetching", () => {
  it("creates action with correct type and sets to true", () => {
    expect(paginationSetFetching(true)).eql({
      type: PAGINATION_SET_FETCHING,
      payload: true,
    })
  })

  it("creates action with correct type and sets to false", () => {
    expect(paginationSetFetching(false)).eql({
      type: PAGINATION_SET_FETCHING,
      payload: false,
    })
  })
})
