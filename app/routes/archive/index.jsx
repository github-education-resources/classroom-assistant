import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import lifecycle from "react-pure-lifecycle"

import AssignmentPanel from "../shared/containers/AssignmentPanel"
import SubmissionArchivePanelList from "./containers/SubmissionArchivePanelList"
import NavFooter from "../shared/components/NavFooter"
import ArchiveProgressPanel from "./containers/ArchiveProgressPanel"

import { settingsResetState } from "../../modules/settings/actions/settings-reset-state"

const methods = {
  componentDidMount (props) {
    const remote = require("electron").remote
    const trackScreen = remote.getGlobal("trackScreen")

    trackScreen("archive")
  }
}

const ArchivePage = ({
  quitApp
}) => (
  <div>
    <AssignmentPanel/>
    <ArchiveProgressPanel/>
    <SubmissionArchivePanelList />
    <NavFooter
      left={{
        label: "Cancel",
        route: "/populate",
        onClick: quitApp
      }}
    />
  </div>
)

const mapDispatchToProps = (dispatch) => ({
  quitApp: () => {
    dispatch(settingsResetState())
  }
})

ArchivePage.propTypes = {
  quitApp: PropTypes.func.isRequired,
}

export default lifecycle(methods)(connect(null, mapDispatchToProps)(ArchivePage))
