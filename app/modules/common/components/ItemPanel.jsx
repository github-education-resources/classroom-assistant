import React, { PropTypes } from "react"

const panelStyles = {
  padding: "20px",
  borderTop: "solid 1px #e3e3e3"
}

const ItemPanel = ({
  imagePath,
  title,
  subtitle,
  children
}) => (
  <div style={panelStyles}>
    <div className="media">
      <div className="media-left">
        <img
          width="48px"
          height="48px"
          src={imagePath}
          className="media-object"
          alt={title}
        />
      </div>
      <div className="media-body">
        <div className="row">
          <div className="col-xs-7">
            <h4 className="media-heading">{title}</h4>
            <h5>{subtitle}</h5>
          </div>
          <div className="col-xs-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
)

ItemPanel.propTypes = {
  imagePath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  children: PropTypes.any
}

export default ItemPanel
