import { expect } from "chai"
import React from "react"
import { shallow } from "enzyme"
import * as sinon from "sinon"

import NavFooter from "../NavFooter"

describe("NavFooter", () => {
  it("renders no buttons if none are provided", () => {
    let wrapper = shallow(<NavFooter />)
    expect(wrapper.find(".btn").length).to.equal(0)
  })

  it("renders left button if provided", () => {
    let testProps = {
      left: {
        label: "TestLabel",
        route: "home"
      }
    }

    let link = {
      pathname: testProps.left.route,
      state: {
        params: testProps.left.params,
      }
    }

    let wrapper = shallow(<NavFooter {...testProps} />)
    let rendered = wrapper.find("button.btn")

    expect(rendered.length).to.equal(1)
    expect(rendered.text()).to.equal(testProps.left.label)
    expect(rendered.parent().prop("to")).to.eql(link)
  })

  it("renders right button if provided", () => {
    let testProps = {
      right: {
        label: "TestLabel",
        route: "home",
      }
    }

    let link = {
      pathname: testProps.right.route,
      state: {
        params: testProps.right.params,
      }
    }

    let wrapper = shallow(<NavFooter {...testProps} />)
    let rendered = wrapper.find("button.btn.pull-right")

    expect(rendered.length).to.equal(1)
    expect(rendered.text()).to.equal(testProps.right.label)
    expect(rendered.parent().prop("to")).to.eql(link)
  })

  it("renders both buttons if provided", () => {
    let testProps = {
      left: {
        label: "TestLabel",
        route: "home",
      },
      right: {
        label: "TestLabel",
        route: "home",
      }
    }

    let link = {
      pathname: testProps.right.route,
      state: {
        params: testProps.right.params,
      }
    }

    let wrapper = shallow(<NavFooter {...testProps} />)
    let right = wrapper.find("button.btn.btn-success")
    let left = wrapper.find("button.btn.btn-danger")

    expect(left.length).to.equal(1)
    expect(left.text()).to.equal(testProps.left.label)
    expect(left.parent().prop("to")).to.eql(link)

    expect(right.length).to.equal(1)
    expect(right.text()).to.equal(testProps.right.label)
    expect(right.parent().prop("to")).to.eql(link)
  })

  it("passes on click function to button", () => {
    let onClickFunc = sinon.spy()

    let testProps = {
      right: {
        label: "TestLabel",
        route: "home",
        onClick: onClickFunc,
      }
    }

    let wrapper = shallow(<NavFooter {...testProps} />)
    let rendered = wrapper.find("button.btn.pull-right")
    rendered.simulate("click")
    expect(onClickFunc.callCount).to.equal(1)
  })

  it("passes params to router", () => {
    let params = {
      data: "test"
    }
    let testProps = {
      right: {
        label: "TestLabel",
        route: "home",
        params: params
      }
    }
    let link = {
      pathname: testProps.right.route,
      state: {
        params: testProps.right.params,
      }
    }

    let wrapper = shallow(<NavFooter {...testProps} />)
    let right = wrapper.find("button.btn.pull-right")
    expect(right.parent().prop("to")).to.eql(link)
  })
})
