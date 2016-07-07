import React from "react"

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
          alt={title}/>
      </div>
      <div className="media-body">
        <div className="row">
          <div className="col-xs-6">
            <h4 className="media-heading">{title}</h4>
            {subtitle}
          </div>
          <div className="col-xs-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default ItemPanel
