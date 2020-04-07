import { expect } from "chai"
import React from "react"
import { shallow } from "enzyme"

import Submission from "../Submission"

describe("Submission", () => {
  const testProps = {
    id: 1,
    username: "testusername",
    displayName: "testdisplayname",
    avatarUrl: "/some/path.jpg",
    repoUrl: "https://some/path.com",
    selected: false
  }

  const testPropsSelected = {
    id: 1,
    username: "testusername",
    displayName: "testdisplayname",
    avatarUrl: "/some/path.jpg",
    repoUrl: "https://some/path.com",
    selected: true
  }

  it("renders an ItemPanel, correctly passing down properties", () => {
    const wrapper = shallow(<Submission {...testProps} />)

    const itemPanels = wrapper.find("ItemPanel")
    expect(itemPanels.length).to.equal(1)

    const itemPanel = itemPanels.first()
    expect(itemPanel.prop("imagePath")).to.equal(testProps.avatarUrl)
    expect(itemPanel.prop("title")).to.equal(testProps.displayName)
    expect(itemPanel.prop("subtitle")).to.equal(testProps.username)
  })

  it("renders a checked checkbox when it is selected", () => {
    const wrapper = shallow(<Submission {...testPropsSelected} />)

    const input = wrapper.find("input")

    expect(input).is.not.null
    expect(input.prop("type")).to.equal("checkbox")
    expect(input.prop("checked")).to.equal(true)
  })

  it("renders an unchecked checkbox when it is not selected", () => {
    const wrapper = shallow(<Submission {...testProps} />)

    const input = wrapper.find("input")

    expect(input).is.not.null
    expect(input.prop("type")).to.equal("checkbox")
    expect(input.prop("checked")).to.equal(false)
  })

  it("calls handler when checkbox is pressed", () => {
    let calledArg = null
    const clickHandler = (arg) => {
      calledArg = arg
    }
    const wrapper = shallow(<Submission {...testProps} onSelectedChange={clickHandler}/>)

    wrapper.find("input").simulate("change")
    expect(calledArg).to.equal(!testProps.selected)
  })
})
