import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import AssignmentPanel from "../shared/containers/AssignmentPanel"
import SelectableSubmissionList from "./containers/SelectableSubmissionList"
import NavFooter from "../shared/components/NavFooter"

import {fetchAllPages} from "../../modules/pagination/actions/pagination-fetch-all"

class SelectPage extends Component {
  componentDidMount () {
    var assignmentURL = this.props.location.state ? this.props.location.state.params : null
    console.log(assignmentURL)
    var urlObj = new URL(assignmentURL)
    var repoURL = `${urlObj.origin}/api/internal/${urlObj.pathname}/repos`
    this.props.fetchAllPages(repoURL)
  }

  render () {
    return (
      <div>
        <AssignmentPanel />
        <SelectableSubmissionList />
        <NavFooter
          left={{
            label: "Cancel",
            route: "/"
          }}
          right={{
            label: "Next: Choose Destination",
            route: "/confirm"
          }}
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchAllPages: (repoURL) => {
    dispatch(fetchAllPages(repoURL))
  },
})

SelectPage.propTypes = {
  fetchAllPages: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
}

export default connect(null, mapDispatchToProps)(SelectPage)
