import React from "react"
import PropTypes from "prop-types"

import ItemPanel from "../../shared/components/ItemPanel"

const editIconStyles = {
  paddingTop: "5px",
  paddingRight: "5px"
}

const EditItemPanel = ({
  iconPath,
  title,
  subtitle,
  onEditClick
}) => (
  <ItemPanel
    imagePath={iconPath}
    title={title}
    subtitle={subtitle}
  >
    <i
      className="fa fa-pencil fa-2x pull-right"
      aria-hidden="true"
      style={editIconStyles}
      onClick={onEditClick}
    />
  </ItemPanel>
)

EditItemPanel.propTypes = {
  iconPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  onEditClick: PropTypes.func
}

export default EditItemPanel
