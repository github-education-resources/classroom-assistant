import React from "react"
import PropTypes from "prop-types"

const ProgressBar = ({cloneProgress}) => (
  <div
    className="progress"
  >
    <div
      className="progress-bar progress-bar-info mt-0"
      role="progressbar" aria-valuenow={cloneProgress}
      aria-valuemin="0"
      aria-valuemax="100"
      style={{
        width: cloneProgress + "%"
      }}
    >
      {cloneProgress.toFixed(0)}%
    </div>
  </div>
)

ProgressBar.propTypes = {
  cloneProgress: PropTypes.number.isRequired,
}

export default ProgressBar
