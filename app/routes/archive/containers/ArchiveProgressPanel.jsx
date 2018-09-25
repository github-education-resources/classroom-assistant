import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import ProgressBar from "../../shared/components/ProgressBar"
import {progress, cloneStatus} from "../../../modules/submissions/selectors"

const ArchiveProgressPanel = ({
  progress,
  cloneStatus
}) => (
  <div className="archive-progress-panel-wrapper">
    <div className="container">
      <p className="text-center mb-1">{cloneStatus}</p>

      {cloneStatus !== "Download Progress" && progress && <ProgressBar cloneProgress={progress}/>}
    </div>
  </div>
)

const mapStateToProps = (state) => ({
  progress: progress(state),
  cloneStatus: cloneStatus(state),
})

ArchiveProgressPanel.propTypes = {
  progress: PropTypes.number.isRequired,
  cloneStatus: PropTypes.string,
}

export default connect(mapStateToProps, null)(ArchiveProgressPanel)
