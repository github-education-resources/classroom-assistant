import React from "react"
import PropTypes from "prop-types"

import ActionableItemArchivePanel from "../containers/ActionableItemArchivePanel"

const ItemArchivePanelList = function (props, context) {
  return (
    <div className="archive-item-archive-panel-list-container">
      {props.submissions.map(submission => {
        return <ActionableItemArchivePanel key={submission.id} {...submission}/>
      })}
    </div>
  )
}

ItemArchivePanelList.propTypes = {
  submissions: PropTypes.array.isRequired
}

export default ItemArchivePanelList
