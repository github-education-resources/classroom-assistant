import React from "react"
import PropTypes from "prop-types"

import { Link } from "react-router"

import Footer from "./Footer"

const linkElement = (id, obj, className) => {
  return (
    <Link to={{ pathname: obj.route, state: { params: obj.params } }} key={id}>
      <button onClick={obj.onClick}
        className={className}
        disabled={obj.disabled}
      >
        {obj.label}
      </button>
    </Link>
  )
}

const NavFooter = ({
  left,
  right
}) => {
  const children = []

  if (left !== undefined) {
    children.push(
      linkElement(0, left, "btn btn-danger")
    )
  }

  if (right !== undefined) {
    children.push(
      linkElement(1, right, "btn btn-success pull-right")
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
    route: PropTypes.string.isRequired,
    onClick: PropTypes.func
  }),
  right: PropTypes.shape({
    label: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    onClick: PropTypes.func
  })
}

export default NavFooter
