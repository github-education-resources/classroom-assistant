import React from "react"
import PropTypes from "prop-types"
import Spinner from "./Spinner"

const LoadingPanel = ({message}) => (
  <div>
    <br/>
    <p className="text-center lead">{message}</p>
    <div className="row align-self-center justify-content-center">
      <Spinner />
    </div>
  </div>
)

LoadingPanel.propTypes = {
  message: PropTypes.string.isRequired,
}

export default LoadingPanel
