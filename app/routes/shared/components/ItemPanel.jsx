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
            className={`mr-3 rounded-circle ${imagePath ? "d-block" : "d-none"}`}
            alt={title}
          />
        }
        {iconName &&
          <span className="shared-item-panel-icon-wrapper">
            <i className={`fa ${iconName} shared-item-panel-icon`} />
          </span>
        }

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
