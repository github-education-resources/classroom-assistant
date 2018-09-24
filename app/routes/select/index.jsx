import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import AssignmentPanel from "../shared/containers/AssignmentPanel"
import SelectableSubmissionList from "./containers/SelectableSubmissionList"
import NavFooter from "../shared/components/NavFooter"
import LoadingPanel from "../shared/components/LoadingPanel"

import {fetchAllPages} from "../../modules/pagination/actions/pagination-fetch-all"
import {submissionReset} from "../../modules/submissions/actions/submission-reset"
import {paginationReset} from "../../modules/pagination/actions/pagination-reset"
import {url} from "../../modules/assignment/selectors"
import {fetching, outOfDate} from "../../modules/pagination/selectors"

class SelectPage extends Component {
  componentDidMount () {
    if (this.props.outOfDate || this.props.fetching) {
      this.props.paginationReset()
      this.props.submissionReset()
      this.props.fetchAllPages(this.props.assignmentURL)
    }

    const remote = require("electron").remote
    const trackScreen = remote.getGlobal("trackScreen")
    trackScreen("select")
  }

  render () {
    return (
      <div>
        <AssignmentPanel />
        {this.props.fetching ? <LoadingPanel message="Loading Assignment Repositories"/> : <SelectableSubmissionList />}
        <NavFooter
          left={{
            label: "Back",
            route: "/populate",
          }}
          right={{
            label: "Next: Choose Destination",
            route: "/confirm",

          }}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  assignmentURL: url(state),
  outOfDate: outOfDate(state),
  fetching: fetching(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchAllPages: (repoURL) => {
    dispatch(fetchAllPages(repoURL))
  },
  paginationReset: () => {
    dispatch(paginationReset())
  },
  submissionReset: () => {
    dispatch(submissionReset())
  },
})

SelectPage.propTypes = {
  fetchAllPages: PropTypes.func.isRequired,
  paginationReset: PropTypes.func.isRequired,
  submissionReset: PropTypes.func.isRequired,
  assignmentURL: PropTypes.string.isRequired,
  outOfDate: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectPage)
