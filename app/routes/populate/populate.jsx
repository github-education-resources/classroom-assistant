import React, { Component } from "react"
import { connect } from "react-redux"
import NavFooter from "../shared/components/NavFooter"
import PropTypes from "prop-types"

import {fetchAssignmentInfo} from "../../modules/assignment/actions/assignment-fetch-info"

const containerStyles = {
  paddingTop: "100px"
}

const placeholderURL = "http://classroom.github.com/classrooms/sample-org/assignments/sample-assignment"

class PopulatePage extends Component {
  constructor (props) {
    super(props)
    this.loadAssignmentInfo = this.loadAssignmentInfo.bind(this)
    this.updateInput = this.updateInput.bind(this)
    var assignmentURLMessage = this.props.location.state ? this.props.location.state.assignmentURL : null
    if (assignmentURLMessage) {
      this.state = {
        assignmentURL: assignmentURLMessage
      }
    } else {
      this.state = {
        assignmentURL: ""
      }
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      var assignmentURLMessage = this.props.location.state ? this.props.location.state.assignmentURL : null
      if (assignmentURLMessage) {
        this.setState({assignmentURL: assignmentURLMessage})
      }
    }
  }

  loadAssignmentInfo () {
    var urlObj = new URL(this.state.assignmentURL)
    var infoURL = `${urlObj.origin}/api/internal/${urlObj.pathname}/info`
    console.log(infoURL)
    this.props.dispatchAssignmentInfo(infoURL)
  }

  updateInput (e) {
    this.setState({assignmentURL: e.target.value})
  }

  render () {
    return (
      <div style={containerStyles}>
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <p className="lead text-center">
              Enter Assignment URL
            </p>
            <input value={this.state.assignmentURL}
              onChange={this.updateInput}
              className="form-control form-control-lg"
              type="text"
              placeholder={placeholderURL}
            />
          </div>
        </div>
        <NavFooter
          left={{
            label: "Cancel",
            route: "/"
          }}
          right={{
            label: "Next: Choose Repositories",
            route: "/select",
            click: this.loadAssignmentInfo,
            params: this.state.assignmentURL,
          }}
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchAssignmentInfo: (assignmentURL) => {
    dispatch(fetchAssignmentInfo(assignmentURL))
  },
})

PopulatePage.propTypes = {
  dispatchAssignmentInfo: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
}

export default connect(null, mapDispatchToProps)(PopulatePage)
