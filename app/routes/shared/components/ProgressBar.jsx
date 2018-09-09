import React from "react"
import PropTypes from "prop-types"

const ProgressBar = ({
  cloneProgress,
  showPercentage,
  className,
}) => (
  <div
    className={`progress my-0 ${className}`}
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
      {showPercentage && cloneProgress.toFixed(0) + "%"}
    </div>
  </div>
)

ProgressBar.propTypes = {
  cloneProgress: PropTypes.number.isRequired,
  showPercentage: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

ProgressBar.defaultProps = {
  showPercentage: true,
}

export default ProgressBar
