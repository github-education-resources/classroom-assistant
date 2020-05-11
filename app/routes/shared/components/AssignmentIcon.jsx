import React from "react"
import PropTypes from "prop-types"

import { PersonIcon, OrganizationIcon } from "react-octicons"

const IndividualIcon = (dark) => {
  return (
    <span className={dark ? "assignment-icon-dark" : "assignment-icon-light"}>
      <PersonIcon size="mega"/>
    </span>
  )
}

const GroupIcon = (dark) => {
  return (
    <span className={dark ? "assignment-icon-dark" : "assignment-icon-light"}>
      <OrganizationIcon size="mega"/>
    </span>
  )
}

const AssignmentIcon = ({
  type,
  dark,
}) => {
  return (
    <div className="assignment-icon-wrapper">
      { type === "individual" && IndividualIcon(dark) }
      { type === "group" && GroupIcon(dark) }
    </div>
  )
}

AssignmentIcon.propTypes = {
  type: PropTypes.string,
  dark: PropTypes.bool,
}

AssignmentIcon.defaultProps = {
  dark: false,
}

export default AssignmentIcon
