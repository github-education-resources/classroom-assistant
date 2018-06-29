import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import AssignmentPanel from "../shared/containers/AssignmentPanel"
import SelectableSubmissionList from "./containers/SelectableSubmissionList"
import NavFooter from "../shared/components/NavFooter"

import {fetchAllPages} from "../../modules/pagination/actions/pagination-fetch-all"
import {url} from "../../modules/assignment/selectors"

class SelectPage extends Component {
  componentDidMount () {
    var urlObj = new URL(this.props.assignmentURL)
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

const mapStateToProps = (state) => ({
  assignmentURL: url(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchAllPages: (repoURL) => {
    dispatch(fetchAllPages(repoURL))
  },
})

SelectPage.propTypes = {
  fetchAllPages: PropTypes.func.isRequired,
  assignmentURL: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectPage)
