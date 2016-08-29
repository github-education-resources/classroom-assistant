jest.unmock("../Header.jsx")

import React from "react"
import { shallow } from "enzyme"

import Header from "../Header.jsx"

describe("Header", () => {
  let wrapper

  const testProps = {
    title: "Test Title",
    subtitle: "Test Subtitle",
    imagePath: "/some/image/path.jpg"
  }

  beforeEach(() => {
    wrapper = shallow(
      <Header {...testProps}>
        <div className="testchild" />
        <div className="testchild" />
        <div className="testchild" />
      </Header>
    )
  })

  it("renders an image using path from props", () => {
    expect(wrapper.find("img").prop("src")).toEqual(testProps.imagePath)
  })

  it("uses the title as the alt text", () => {
    expect(wrapper.find("img").prop("alt")).toEqual(testProps.title)
  })

  it("renders a title with the provided title prop", () => {
    expect(wrapper.find("h4").text()).toEqual(testProps.title)
  })

  it("renders subtitle text with the provided subtitle prop", () => {
    expect(wrapper.text().indexOf(testProps.subtitle)).not.toBe(-1)
  })

  it("render children passed as props", () => {
    expect(wrapper.find(".testchild").length).toEqual(3)
  })
})
