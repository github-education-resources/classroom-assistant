import React from "react"
import PropTypes from "prop-types"

import ActionableItemArchivePanel from "../containers/ActionableItemArchivePanel"

const containerStyles = {
  marginBottom: "100px"
}

const ItemArchivePanelList = function (props, context) {
  return (
    <div style={containerStyles}>
      {this.props.submissions.map(submission => {
        return <ActionableItemArchivePanel key={submission.id} {...submission}/>
      })}
    </div>
  )
}

ItemArchivePanelList.propTypes = {
  submissions: PropTypes.array.isRequired
}

export default ItemArchivePanelList
