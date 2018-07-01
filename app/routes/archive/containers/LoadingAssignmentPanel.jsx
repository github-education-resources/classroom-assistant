import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import AssignmentPanel from "../../shared/containers/AssignmentPanel"
import ProgressBar from "../../shared/components/ProgressBar"
import {progress} from "../../../modules/submissions/selectors"

const LoadingAssignmentPanel = ({progress}) => (
  <AssignmentPanel>
    <p className="text-center mt-1 mb-1">Download Progress</p>
    <ProgressBar cloneProgress={progress}/>
  </AssignmentPanel>
)

const mapStateToProps = (state) => ({
  progress: progress(state),
})

LoadingAssignmentPanel.propTypes = {
  progress: PropTypes.number.isRequired,
}

export default connect(mapStateToProps, null)(LoadingAssignmentPanel)
