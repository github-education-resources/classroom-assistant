jest.unmock("../Submission.jsx")
jest.unmock("../../../../shared-components/ItemPanel.jsx")

import React from "react"
import { shallow } from "enzyme"

import Submission from "../Submission.jsx"

describe("Submission", () => {
  const testProps = {
    id: 1,
    username: "testusername",
    displayName: "testdisplayname",
    avatarUrl: "/some/path.jpg",
    repoUrl: "http://some/path.com",
    selected: false
  }

  const testPropsSelected = {
    id: 1,
    username: "testusername",
    displayName: "testdisplayname",
    avatarUrl: "/some/path.jpg",
    repoUrl: "http://some/path.com",
    selected: true
  }

  it("renders an ItemPanel, correctly passing down properties", () => {
    let wrapper = shallow(<Submission {...testProps} />)

    const itemPanels = wrapper.find("ItemPanel")
    expect(itemPanels.length).toBe(1)

    const itemPanel = itemPanels.first()
    expect(itemPanel.prop("imagePath")).toEqual(testProps.avatarUrl)
    expect(itemPanel.prop("title")).toEqual(testProps.displayName)
    expect(itemPanel.prop("subtitle")).toEqual(testProps.username)
  })

  it("renders a checked checkbox when it is selected", () => {
    let wrapper = shallow(<Submission {...testPropsSelected} />)

    const input = wrapper.find("input")
    expect(input).toBeDefined()
    expect(input.prop("type")).toEqual("checkbox")
    expect(input.prop("checked")).toEqual(true)
  })

  it("renders an unchecked checkbox when it is not selected", () => {
    let wrapper = shallow(<Submission {...testProps} />)

    const input = wrapper.find("input")
    expect(input).toBeDefined()
    expect(input.prop("type")).toEqual("checkbox")
    expect(input.prop("checked")).toEqual(false)
  })
})
