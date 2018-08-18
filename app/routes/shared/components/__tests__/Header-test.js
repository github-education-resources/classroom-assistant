import { expect } from "chai"
import React from "react"
import { shallow } from "enzyme"

import Header from "../Header"
import LogoutButton from "../../containers/LogoutButton"

describe("Header", () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <Header>
        <div className="testchild" />
        <div className="testchild" />
        <div className="testchild" />
      </Header>
    )
  })

  it("renders logout button", () => {
    expect(wrapper.find(LogoutButton).length).equals(1)
  })

  it("render children passed as props", () => {
    expect(wrapper.find(".testchild").length).to.equal(3)
  })
})
