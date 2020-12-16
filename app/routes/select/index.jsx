import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import AssignmentPanel from "../shared/containers/AssignmentPanel"
import NavFooter from "../shared/components/NavFooter"
import LoadingPanel from "../shared/components/LoadingPanel"
import SubmissionList from "./components/SubmissionList"

import { fetchAllPages } from "../../modules/pagination/actions/pagination-fetch-all"
import { submissionReset } from "../../modules/submissions/actions/submission-reset"
import { paginationReset } from "../../modules/pagination/actions/pagination-reset"
import { url } from "../../modules/assignment/selectors"
import { fetching, outOfDate } from "../../modules/pagination/selectors"
import { all } from "../../modules/submissions/selectors"

class SelectPage extends Component {
  componentDidMount () {
    if (this.props.outOfDate || this.props.fetching) {
      this.props.paginationReset()
      this.props.submissionReset()
      this.props.fetchAllPages(this.props.assignmentURL)
    }
  }

  render () {
    return (
      <div>
        <AssignmentPanel />
        {this.props.fetching ? <LoadingPanel message="Loading Assignment Repositories"/> : <SubmissionList submissions={this.props.submissions}/>}
        <NavFooter
          left={{
            label: "Back",
            route: "/populate",
          }}
          right={{
            label: "Next: Choose Destination",
            route: "/confirm",
            disabled: (this.props.fetching || this.props.submissions.length < 1)
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
  submissions: all(state)
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
  submissions: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectPage)
