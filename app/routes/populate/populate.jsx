import React, { Component } from "react"
import { connect } from "react-redux"
import NavFooter from "../shared/components/NavFooter"
import PropTypes from "prop-types"
import classNames from "classnames"
import AssignmentCard from "./components/AssignmentCard"
import LoadingPanel from "../shared/components/LoadingPanel"

import { assignmentFetchInfo } from "../../modules/assignment/actions/assignment-fetch-info"
import { setAssignmentURL } from "../../modules/assignment/actions/assignment-set-url"
import { settingsLoginUser } from "../../modules/settings/actions/settings-login-user"
import { url, error, valid, name, typeLabel, fetching, all } from "../../modules/assignment/selectors"
import { userAuthorized } from "../../modules/settings/selectors"
import ClassroomPanel from "../shared/containers/ClassroomPanel"

const placeholderURL = "https://classroom.github.com/classrooms/your-org/assignments/your-assignment"

class PopulatePage extends Component {
  constructor (props) {
    super(props)
    this.updateInput = this.updateInput.bind(this)
  }

  componentDidMount (_props) {
  }

  updateInput (e) {
    this.props.fetchAssignment(e.target.value)
  }

  render () {
    const inputClasses = classNames("form-control", { "is-invalid": this.props.error })

    return (
      <div className="container-fluid">
        <ClassroomPanel/>
        <div className="row justify-content-center populate-content">
          <div className="col-8">
            <p className="lead text-center">Enter Assignment URL</p>
            <input value={this.props.assignmentURL}
              onChange={this.updateInput}
              placeholder={placeholderURL}
              className={inputClasses}
            />
            {this.props.error && !this.props.fetching && <p className="text-danger">{this.props.error}</p>}
            {this.props.fetching &&
              <LoadingPanel className = "populate-loading-panel" message = "Loading Assignment Information"/>
            }
            {this.props.valid && !this.props.fetching &&
              <AssignmentCard
                name={this.props.name}
                typeLabel={this.props.typeLabel}
                type={this.props.type}
                className = "populate-assignment-card"
              />
            }
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
            disabled: !this.props.valid || this.props.fetching
          }}
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchAssignment: (assignmentURL) => {
    dispatch(setAssignmentURL(assignmentURL))
    dispatch(assignmentFetchInfo())
  },
  loginUser: () => {
    dispatch(settingsLoginUser())
  },
})

const mapStateToProps = (state) => ({
  assignmentURL: url(state),
  error: error(state),
  name: name(state),
  typeLabel: typeLabel(state),
  valid: valid(state),
  fetching: fetching(state),
  loggedIn: userAuthorized(state),
  type: all(state).type,
})

PopulatePage.propTypes = {
  fetchAssignment: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  assignmentURL: PropTypes.string,
  error: PropTypes.string,
  valid: PropTypes.bool,
  name: PropTypes.string,
  type: PropTypes.string,
  typeLabel: PropTypes.string,
  fetching: PropTypes.bool,
  loggedIn: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(PopulatePage)
