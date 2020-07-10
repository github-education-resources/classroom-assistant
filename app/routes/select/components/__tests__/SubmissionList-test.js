import { expect } from "chai"
import React from "react"
import { shallow } from "enzyme"

import SubmissionList from "../SubmissionList"
import SelectableSubmission from "../../containers/SelectableSubmission"

describe("SubmissionList", () => {
  const testProps = {
    submissions: [{
      id: 1,
      username: "testusername",
      displayName: "testdisplayname",
      avatarUrl: "/some/path.jpg",
      repoUrl: "https://some/path.com",
      selected: false
    }, {
      id: 2,
      username: "testusername",
      displayName: "testdisplayname",
      avatarUrl: "/some/path.jpg",
      repoUrl: "https://some/path.com",
      selected: true
    }]
  }

  it("renders SelectableSubmission components as children", () => {
    const wrapper = shallow(<SubmissionList {...testProps} />)
    expect(wrapper.find(SelectableSubmission).length).to.equal(2)
  })
})
