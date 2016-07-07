import React, { PropTypes } from "react"
import ItemPanel from "../../../shared-components/ItemPanel"

const editIconStyles = {
  paddingTop: "5px",
  paddingRight: "5px"
}

const ConfirmPanel = ({
  iconPath,
  title,
  subtitle
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
    />
  </ItemPanel>
)

ConfirmPanel.propTypes = {
  iconPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
}

export default ConfirmPanel
