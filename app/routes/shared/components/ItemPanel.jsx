import React from "react"
import PropTypes from "prop-types"

const ItemPanel = ({
  iconName,
  title,
  subtitle,
  children,
  imagePath,
}) => (
  <div className="shared-item-panel-wrapper">
    <div className="container">
      <div className="media">
        {imagePath &&
          <img
            width="48px"
            height="48px"
            src={imagePath}
            className={`mr-3 rounded-circle align-self-center ${imagePath ? "d-block" : "d-none"}`}
            alt={title}
          />
        }
        {iconName &&
          <span className="shared-item-panel-icon-wrapper">
            <i className={`fa ${iconName} shared-item-panel-icon`} />
          </span>
        }

        <div className="media-body align-self-center">
          <div className="row">
            <div className="col-7 align-self-center">
              <h5 className="shared-item-panel-title">{title}</h5>
              {subtitle && <h6 className="shared-item-panel-subtitle">{subtitle}</h6> }
            </div>
            <div className="col-5 align-self-center">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

ItemPanel.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  iconName: PropTypes.string,
  children: PropTypes.any,
  imagePath: PropTypes.string,
}

export default ItemPanel
