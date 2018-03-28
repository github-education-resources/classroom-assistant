import React from "react"
import PropTypes from "prop-types"

const mediaContainerStyles = {
  padding: "20px",
  background: "#fbfbfb",
  borderBottom: "solid 1px #e3e3e3"
}

const Header = ({
  title,
  subtitle,
  imagePath,
  children
}) => {
  return (
    <div style={mediaContainerStyles}>
      <div className="media">
        <a className="media-left" href="#">
          <img src={imagePath} className="media-object" alt={title} />
        </a>
        <div className="media-body">
          <div className="row">
            <div className="col-sm-6">
              <h4 className="media-heading">{title}</h4>
              {subtitle}
            </div>
            <div className="col-sm-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  imagePath: PropTypes.string.isRequired,
  children: PropTypes.array
}

export default Header
