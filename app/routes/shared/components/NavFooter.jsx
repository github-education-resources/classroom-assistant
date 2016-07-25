import React, { PropTypes } from "react"
import { Link } from "react-router"

import Footer from "./Footer"

const NavFooter = ({
  left,
  right
}) => {
  let children = []

  if (left !== undefined) {
    children.push(
      <Link to={left.route} key={0}>
        <button className="btn btn-danger">{left.label}</button>
      </Link>
    )
  }

  if (right !== undefined) {
    children.push(
      <Link to={right.route} key={1}>
        <button className="btn btn-success pull-right">{right.label}</button>
      </Link>
    )
  }

  return (
    <Footer>
      {children}
    </Footer>
  )
}

NavFooter.propTypes = {
  left: PropTypes.shape({
    label: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired
  }),
  right: PropTypes.shape({
    label: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired
  })
}

export default NavFooter
