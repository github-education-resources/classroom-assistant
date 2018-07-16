import React from "react"
import PropTypes from "prop-types"

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
      <img
        width="48px"
        height="48px"
        src={imagePath}
        className={`mr-3 rounded-circle ${imagePath ? "d-block" : "d-none"}`}
        alt={title}
      />
      <div className="media-body">
        <div className="row">
          <div className="col-7">
            <h5>{title}</h5>
            <h6>{subtitle}</h6>
          </div>
          <div className="col-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
)

ItemPanel.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  imagePath: PropTypes.string,
  children: PropTypes.any
}

export default ItemPanel
