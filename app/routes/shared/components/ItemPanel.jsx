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
            className={`mr-3 rounded-circle mt-1 ${imagePath ? "d-block" : "d-none"}`}
            alt={title}
          />
        }
        {iconName &&
          <span className="shared-item-panel-icon-wrapper">
            <i className={`fa ${iconName} shared-item-panel-icon`} />
          </span>
        }

        <div className="media-body h-100">
          <div className="row h-100">
            <div className="col-7 h-100 align-self-center">
              <h5>{title}</h5>
              <h6 className="shared-item-panel-subtitle">{subtitle}</h6>
            </div>
            <div className="col-5 h-100">
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
  subtitle: PropTypes.string.isRequired,
  iconName: PropTypes.string,
  children: PropTypes.any,
  imagePath: PropTypes.string,
}

export default ItemPanel
