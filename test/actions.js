/* eslint-env mocha */

import { assert } from "chai"
import { SELECT_ITEM } from "../app/constants/actionTypes"
import { selectItem } from "../app/actions"

describe("actions", () => {
  it("should create an action to select an item", () => {
    const id = 1
    const expectedAction = {
      type: SELECT_ITEM,
      id: id
    }

    assert.deepEqual(expectedAction, selectItem(id))
  })
})
