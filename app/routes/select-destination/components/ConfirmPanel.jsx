import React, { PropTypes } from "react"
import ItemPanel from "../../../shared-components/ItemPanel"

const ConfirmPanel = ({
  iconPath,
  title,
  subtitle
}) => (
  <ItemPanel
    imagePath={iconPath}
    title={title}
    subtitle={subtitle}
  />
)

ConfirmPanel.propTypes = {
  iconPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
}

export default ConfirmPanel
