import { expect } from "chai"
import React from "react"
import { shallow } from "enzyme"
import * as sinon from "sinon"

import NavFooter from "../NavFooter"

describe("NavFooter", () => {
  it("renders no buttons if none are provided", () => {
    const wrapper = shallow(<NavFooter />)
    expect(wrapper.find(".btn").length).to.equal(0)
  })

  it("renders left button if provided", () => {
    const testProps = {
      left: {
        label: "TestLabel",
        route: "home"
      }
    }

    const link = {
      pathname: testProps.left.route,
      state: {
        params: testProps.left.params,
      }
    }

    const wrapper = shallow(<NavFooter {...testProps} />)
    const rendered = wrapper.find("button.btn")

    expect(rendered.length).to.equal(1)
    expect(rendered.text()).to.equal(testProps.left.label)
    expect(rendered.parent().prop("to")).to.eql(link)
  })

  it("renders right button if provided", () => {
    const testProps = {
      right: {
        label: "TestLabel",
        route: "home",
      }
    }

    const link = {
      pathname: testProps.right.route,
      state: {
        params: testProps.right.params,
      }
    }

    const wrapper = shallow(<NavFooter {...testProps} />)
    const rendered = wrapper.find("button.btn.pull-right")

    expect(rendered.length).to.equal(1)
    expect(rendered.text()).to.equal(testProps.right.label)
    expect(rendered.parent().prop("to")).to.eql(link)
  })

  it.skip("renders both buttons if provided", () => {
    const testProps = {
      left: {
        label: "TestLabel",
        route: "home",
      },
      right: {
        label: "TestLabel",
        route: "home",
      }
    }

    const link = {
      pathname: testProps.right.route,
      state: {
        params: testProps.right.params,
      }
    }

    const wrapper = shallow(<NavFooter {...testProps} />)
    const right = wrapper.find("button.btn.btn-success")
    const left = wrapper.find("button.btn.btn-danger")

    expect(left.length).to.equal(1)
    expect(left.text()).to.equal(testProps.left.label)
    expect(left.parent().prop("to")).to.eql(link)

    expect(right.length).to.equal(1)
    expect(right.text()).to.equal(testProps.right.label)
    expect(right.parent().prop("to")).to.eql(link)
  })

  it("passes on click function to button", () => {
    const onClickFunc = sinon.spy()

    const testProps = {
      right: {
        label: "TestLabel",
        route: "home",
        onClick: onClickFunc,
      }
    }

    const wrapper = shallow(<NavFooter {...testProps} />)
    const rendered = wrapper.find("button.btn.pull-right")
    rendered.simulate("click")
    expect(onClickFunc.callCount).to.equal(1)
  })

  it("passes params to router", () => {
    const params = {
      data: "test"
    }
    const testProps = {
      right: {
        label: "TestLabel",
        route: "home",
        params: params
      }
    }
    const link = {
      pathname: testProps.right.route,
      state: {
        params: testProps.right.params,
      }
    }

    const wrapper = shallow(<NavFooter {...testProps} />)
    const right = wrapper.find("button.btn.pull-right")
    expect(right.parent().prop("to")).to.eql(link)
  })
})
