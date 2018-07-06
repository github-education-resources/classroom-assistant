import { expect } from "chai"
import { paginationSetFetching } from "../pagination-set-fetching"
import { PAGINATION_SET_FETCHING } from "../../constants"

describe("paginationSetFetching", () => {
  it("creates action with correct type", () => {
    expect(paginationSetFetching()).eql({
      type: PAGINATION_SET_FETCHING,
    })
  })
})
