import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import ProgressBar from "../../shared/components/ProgressBar"
import {progress} from "../../../modules/submissions/selectors"

const ArchiveProgressPanel = ({progress}) => (
  <div className="archive-progress-panel-wrapper">
    <div className="container">
      <p className="text-center mb-1">Download Progress</p>
      <ProgressBar cloneProgress={progress}/>
    </div>
  </div>
)

const mapStateToProps = (state) => ({
  progress: progress(state),
})

ArchiveProgressPanel.propTypes = {
  progress: PropTypes.number.isRequired,
}

export default connect(mapStateToProps, null)(ArchiveProgressPanel)
