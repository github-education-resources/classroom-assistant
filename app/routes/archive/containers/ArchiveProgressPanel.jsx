import React from "react"
import PropTypes from "prop-types"
import ProgressBar from "../../shared/components/ProgressBar"

const ArchiveProgressPanel = ({ progress }) => {
  let progressElement
  if (progress < 0) {
    progressElement = (
      <div className="d-flex justify-content-center w-100">
        <i className="text-center fa fa-exclamation-triangle archive-progress-panel-warning-icon mr-2 mt-1"/>
        <p className="text-center mb-1">Download complete. Some submissions were not cloned successfully.</p>
      </div>
    )
  } else if (progress >= 0 && progress < 100) {
    progressElement = (
      <div className="container-fluid">
        <p className="text-center mb-1">Download Progress</p>
        <ProgressBar cloneProgress={progress}/>
      </div>
    )
  } else if (progress === 100) {
    progressElement = (
      <div className="d-flex justify-content-center w-100">
        <p className="text-center mb-1">Download Complete</p>
        <i className="fa fa-check archive-progress-panel-success-icon ml-2 mt-1"/>
      </div>
    )
  }

  return (
    <div className="archive-progress-panel-wrapper">
      <div className="d-flex align-items-center h-100">
        {progressElement}
      </div>
    </div>
  )
}

ArchiveProgressPanel.propTypes = {
  progress: PropTypes.number.isRequired,
}

export default ArchiveProgressPanel
