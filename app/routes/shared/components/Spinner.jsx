import React from "react"
import PropTypes from "prop-types"
import spinner from "../../../resources/images/octocat-spinner-64.gif"

const Spinner = ({ className }) => {
  return <img className={className} src={spinner} />
}

Spinner.propTypes = {
  className: PropTypes.string,
}

export default Spinner
