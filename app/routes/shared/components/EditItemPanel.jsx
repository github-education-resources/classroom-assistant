import React from "react"
import PropTypes from "prop-types"

import ItemPanel from "../../shared/components/ItemPanel"

const EditItemPanel = ({
  leftIconName,
  rightIconName,
  title,
  subtitle,
  onEditClick,
}) => (
  <ItemPanel
    title={title}
    subtitle={subtitle}
    iconName={leftIconName}
  >
    <i
      className={`fa ${rightIconName} pull-right shared-edit-item-panel-icon`}
      aria-hidden="true"
      onClick={onEditClick}
    />
  </ItemPanel>
)

EditItemPanel.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  onEditClick: PropTypes.func,
  leftIconName: PropTypes.string,
  rightIconName: PropTypes.string,
}

EditItemPanel.defaultProps = {
  iconName: "fa-pencil"
}

export default EditItemPanel
