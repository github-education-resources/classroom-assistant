import React, { PropTypes } from "react"
import { Link } from "react-router"

const containerStyles = {
  padding: "20px",
  background: "#fbfbfb",
  borderTop: "solid 1px #e3e3e3"
}

const Footer = ({
  left,
  right
}) => {
  let leftLink
  if (left !== undefined) {
    leftLink = (
      <Link to={left.route}>
        <button className="btn btn-danger">{left.label}</button>
      </Link>
    )
  }

  let rightLink
  if (right !== undefined) {
    rightLink = (
      <Link to={right.route}>
        <button className="btn btn-success pull-right">{right.label}</button>
      </Link>
    )
  }

  return (
    <div className="navbar-fixed-bottom" style={containerStyles}>
      {leftLink}
      {rightLink}
    </div>
  )
}

Footer.propTypes = {
  left: PropTypes.shape({
    label: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired
  }),
  right: PropTypes.shape({
    label: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired
  })
}

export default Footer
