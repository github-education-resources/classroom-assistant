import { expect } from "chai"
import { paginationReset } from "../pagination-reset"
import { PAGINATION_RESET } from "../../constants"

describe("paginationReset", () => {
  it("creates action with correct type", () => {
    expect(paginationReset()).eql({
      type: PAGINATION_RESET,
    })
  })
})
