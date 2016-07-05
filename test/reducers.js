/* eslint-env mocha */

import { assert } from "chai"
import { SELECT_ITEM } from "../app/constants/actionTypes"
import deepFreeze from "deep-freeze"

import itemsReducer from "../app/reducers/items"

describe("reducers", () => {
  describe("items reducer", () => {
    it("should return the initial state", () => {
      let expectedState = [
        {
          id: 1,
          text: "Item 1",
          active: false
        },
        {
          id: 2,
          text: "Item 2",
          active: true
        }
      ]

      assert.deepEqual(
        expectedState,
        itemsReducer(undefined, {})
      )
    })

    it("should select the correct item", () => {
      let initialState = [
        {
          id: 1,
          text: "Item 1",
          active: false
        },
        {
          id: 2,
          text: "Item 2",
          active: true
        }
      ]

      let expectedState = [
        {
          id: 1,
          text: "Item 1",
          active: true
        },
        {
          id: 2,
          text: "Item 2",
          active: true
        }
      ]

      let action = {
        type: SELECT_ITEM,
        id: 1
      }

      deepFreeze(initialState)

      assert.deepEqual(
        expectedState,
        itemsReducer(initialState, action)
      )
    })
  })
})
