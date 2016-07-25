jest.unmock("../NavFooter.jsx")

import React from "react"
import { shallow } from "enzyme"

import NavFooter from "../NavFooter.jsx"

describe("NavFooter", () => {
  it("renders no buttons if none are provided", () => {
    let wrapper = shallow(<NavFooter />)
    expect(wrapper.find(".btn").length).toBe(0)
  })

  it("renders left button if provided", () => {
    let testProps = {
      left: {
        label: "TestLabel",
        route: "home"
      }
    }

    let wrapper = shallow(<NavFooter {...testProps} />)
    let rendered = wrapper.find("button.btn")

    expect(rendered.length).toBe(1)
    expect(rendered.text()).toBe(testProps.left.label)
    expect(rendered.parent().prop("to")).toBe(testProps.left.route)
  })

  it("renders right button if provided", () => {
    let testProps = {
      right: {
        label: "TestLabel",
        route: "home"
      }
    }

    let wrapper = shallow(<NavFooter {...testProps} />)
    let rendered = wrapper.find("button.btn.pull-right")

    expect(rendered.length).toBe(1)
    expect(rendered.text()).toBe(testProps.right.label)
    expect(rendered.parent().prop("to")).toBe(testProps.right.route)
  })

  it("renders both buttons if provided", () => {
    let testProps = {
      left: {
        label: "TestLabel",
        route: "home"
      },
      right: {
        label: "TestLabel",
        route: "home"
      }
    }

    let wrapper = shallow(<NavFooter {...testProps} />)
    let right = wrapper.find("button.btn.pull-right")
    let left = wrapper.find("button.btn.pull-right")

    expect(left.length).toBe(1)
    expect(left.text()).toBe(testProps.left.label)
    expect(left.parent().prop("to")).toBe(testProps.left.route)

    expect(right.length).toBe(1)
    expect(right.text()).toBe(testProps.right.label)
    expect(right.parent().prop("to")).toBe(testProps.right.route)
  })
})
