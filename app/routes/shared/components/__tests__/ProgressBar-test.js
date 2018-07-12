import { expect } from "chai"
import React from "react"
import { shallow } from "enzyme"

import ProgressBar from "../ProgressBar"

describe("ProgressBar", () => {
  let wrapper

  const progressProps = {
    cloneProgress: 32,
  }

  beforeEach(() => {
    wrapper = shallow(
      <ProgressBar {...progressProps}/>
    )
  })

  it("renders the completion percentage inside the progress bar", () => {
    expect(wrapper.find(".progress-bar").text()).equals(progressProps.cloneProgress + "%")
  })

  it("renders the progress bar with the fill corresponding to the percentage", () => {
    expect(wrapper.find(".progress-bar").prop("aria-valuenow")).equals(progressProps.cloneProgress)
  })
})
