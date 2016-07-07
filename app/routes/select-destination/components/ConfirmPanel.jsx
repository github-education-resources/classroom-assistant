import React, { PropTypes } from "react"
import ItemPanel from "../../../shared-components/ItemPanel"

const editIconStyles = {
  paddingTop: "5px",
  paddingRight: "5px"
}

const ConfirmPanel = ({
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

ConfirmPanel.propTypes = {
  iconPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  onEditClick: PropTypes.func.isRequired
}

export default ConfirmPanel
