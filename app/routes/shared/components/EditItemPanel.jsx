import React from "react"
import PropTypes from "prop-types"

import ItemPanel from "../../shared/components/ItemPanel"

const editIconStyles = {
  paddingTop: "5px",
  paddingRight: "5px"
}

const EditItemPanel = ({
  imagePath,
  title,
  subtitle,
  onEditClick,
  iconName,
}) => (
  <ItemPanel
    imagePath={imagePath}
    title={title}
    subtitle={subtitle}
  >
    <i
      className={`fa ${iconName} pull-right`}
      aria-hidden="true"
      style={editIconStyles}
      onClick={onEditClick}
    />
  </ItemPanel>
)

EditItemPanel.propTypes = {
  imagePath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  onEditClick: PropTypes.func,
  iconName: PropTypes.string,
}

EditItemPanel.defaultProps = {
  iconName: "fa-pencil"
}

export default EditItemPanel
