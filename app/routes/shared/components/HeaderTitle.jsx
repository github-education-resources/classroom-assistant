import React from "react"
import PropTypes from "prop-types"

const HeaderTitle = ({
  title,
  subtitle,
}) => {
  return (
    <div className="media w-auto shared-header-title">
      <div className="media-body">
        <div className="row">
          <div className="col-sm col-sm-auto">
            <h4 className="my-0">{title}</h4>
            {subtitle}
          </div>
        </div>
      </div>
    </div>
  )
}

HeaderTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  type: PropTypes.string,
}

export default HeaderTitle
