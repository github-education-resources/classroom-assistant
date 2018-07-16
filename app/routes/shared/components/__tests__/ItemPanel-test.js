import { expect } from "chai"
import React from "react"
import { shallow } from "enzyme"

import ItemPanel from "../ItemPanel"

describe("ItemPanel", () => {
  let wrapper

  const testOptions = {
    imagePath: "/some/path.jpg",
    title: "test title",
    subtitle: "test subtitle"
  }

  beforeEach(() => {
    wrapper = shallow(<ItemPanel {...testOptions}>
      <div className="testchild"/>
      <div className="testchild"/>
      <div className="testchild"/>
    </ItemPanel>)
  })

  describe("user avatar", () => {
    it("renders with the provided path", () => {
      expect(wrapper.find("img").prop("src")).to.equal(testOptions.imagePath)
    })

    it("uses the title as the alt text", () => {
      expect(wrapper.find("img").prop("alt")).to.equal(testOptions.title)
    })
  })

  it("renders a title with the provided title prop", () => {
    expect(wrapper.find("h5").text()).to.equal(testOptions.title)
  })

  it("renders subtitle text with the provided subtitle prop", () => {
    expect(wrapper.find("h6").text()).to.equal(testOptions.subtitle)
  })

  it("render children passed as props", () => {
    expect(wrapper.find(".testchild").length).to.equal(3)
  })
})
