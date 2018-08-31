import React from "react"
import PropTypes from "prop-types"

import * as Path from "path"

const Spinner = ({
  className
}) => {
  return (
    <img
      className={ className }
      src={ Path.join(__dirname, "../../../resources/images/octocat-spinner-64.gif") }
    />
  )
}

Spinner.propTypes = {
  className: PropTypes.string,
}

export default Spinner
