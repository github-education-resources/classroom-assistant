import { expect } from "chai"
import React from "react"
import { shallow } from "enzyme"

import Header from "../Header"

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
    expect(wrapper.find("img").prop("src")).to.equal(testProps.imagePath)
  })

  it("uses the title as the alt text", () => {
    expect(wrapper.find("img").prop("alt")).to.equal(testProps.title)
  })

  it("renders a title with the provided title prop", () => {
    expect(wrapper.find("h4").text()).to.equal(testProps.title)
  })

  it("renders subtitle text with the provided subtitle prop", () => {
    expect(wrapper.text().indexOf(testProps.subtitle)).to.not.equal(-1)
  })

  it("render children passed as props", () => {
    expect(wrapper.find(".testchild").length).to.equal(3)
  })
})
