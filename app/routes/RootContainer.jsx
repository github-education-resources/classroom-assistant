import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { submissionCreate } from "../modules/submissions/actions/submission-create"
import { num } from "../modules/submissions/selectors"
import {setAssignmentTitle} from "../modules/assignment/actions/assignment-set-title"
import {setAssignmentType} from "../modules/assignment/actions/assignment-set-type"
import { ipcRenderer, remote } from "electron"

class RootContainer extends Component {
  constructor (props) {
    super(props)
    ipcRenderer.on("open-url", () => {
      var params = remote.getGlobal("sharedObj")
      var repos = params.repos

      this.props.setAssignmentTitle(params.title)
      this.props.setAssignmentType(params.type)

      repos.forEach((repo) => {
        this.props.addRepo({
          id: this.props.total,
          username: repo["username"],
          displayName: repo["username"],
          avatarUrl: `https://avatars.githubusercontent.com/${repo["username"]}?v=3&size=96`,
          repoUrl: repo["repo_url"],
          selected: true,
          clonePath: "",
          cloneStatus: "",
          cloneProgress: 0
        })
      })
      this.props.router.push("/select")
    })
  }
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  total: num(state)
})

const mapDispatchToProps = (dispatch) => ({
  addRepo: (data) => {
    dispatch(submissionCreate(data))
  },
  setAssignmentTitle: (title) => {
    dispatch(setAssignmentTitle(title))
  },
  setAssignmentType: (type) => {
    dispatch(setAssignmentType(type))
  }
})

RootContainer.propTypes = {
  setAssignmentTitle: PropTypes.func.isRequired,
  setAssignmentType: PropTypes.func.isRequired,
  addRepo: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  router: PropTypes.any.isRequired,
  children: PropTypes.any
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
