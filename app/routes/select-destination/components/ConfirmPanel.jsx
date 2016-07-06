import React, { PropTypes } from "react"

const containerStyles = {
  padding: "10px",
  borderTop: "solid 1px #e3e3e3"
}

const ConfirmPanel = ({
  iconPath,
  title,
  subtitle
}) => {
  return (
    <div style={containerStyles}>
      <div className="media">
        <a className="media-left" href="#">
          <img
            width="48px"
            height="48px"
            src={iconPath}
            className="media-object"
            alt={title}/>
        </a>
        <div className="media-body">
          <div className="row">
            <div className="col-xs-6">
              <h4 className="media-heading">{title}</h4>
              {subtitle}
            </div>
            <div className="col-xs-6">
              <span class="glyphion glyphicon-pencil"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ConfirmPanel.propTypes = {
  iconPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
}

export default ConfirmPanel
