import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import AssignmentPanel from "../shared/containers/AssignmentPanel"
import SelectableSubmissionList from "./containers/SelectableSubmissionList"
import Pagination from "./components/Pagination"

import NavFooter from "../shared/components/NavFooter"

import {fetchPage} from "../../modules/pagination/actions/pagination-fetch-page"

class SelectPage extends Component {

  componentDidMount(){
    var assignmentURL = this.props.location.state ? this.props.location.state.params : null
    console.log(assignmentURL);
    var urlObj = new URL(assignmentURL)
    var repoURL = `${urlObj.origin}/api/internal/${urlObj.pathname}/repos`
    this.props.fetchPage(1, repoURL)
  }
  
  render(){
    return(
      <div>
        <AssignmentPanel />
        <SelectableSubmissionList />
        <Pagination />
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
    )}
}

const mapDispatchToProps = (dispatch) => ({
  fetchPage: (page, repoURL) => {
    dispatch(fetchPage(page, repoURL))
  },
})

SelectPage.propTypes = {
  fetchPage: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(SelectPage)
