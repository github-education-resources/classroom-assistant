jest.unmock("../ItemPanel.jsx")

import React from "react"
import { shallow } from "enzyme"

import ItemPanel from "../ItemPanel.jsx"

describe("ItemPanel", () => {
  let wrapper

  let testOptions = {
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
      expect(wrapper.find("img").prop("src")).toEqual(testOptions.imagePath)
    })

    it("uses the title as the alt text", () => {
      expect(wrapper.find("img").prop("alt")).toEqual(testOptions.title)
    })
  })

  it("renders a title with the provided title prop", () => {
    expect(wrapper.find("h4").text()).toEqual(testOptions.title)
  })

  it("renders subtitle text with the provided subtitle prop", () => {
    expect(wrapper.find("h5").text()).toEqual(testOptions.subtitle)
  })

  it("render children passed as props", () => {
    expect(wrapper.find(".testchild").length).toEqual(3)
  })
})
