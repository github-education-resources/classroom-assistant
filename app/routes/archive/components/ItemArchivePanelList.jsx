import React, { PropTypes } from "react"
import { compose, withHandlers } from "recompose"

import ItemArchivePanel from "./ItemArchivePanel"

const containerStyles = {
  marginBottom: "100px"
}

const enchance = compose(
  withHandlers({
    renderItemArchivePanel: (props) => (submissionProps) => {
      return (
        <ItemArchivePanel key={submissionProps.id} {...submissionProps}/>
      )
    }
  })
)

const ItemArchivePanelList = enchance(({
  submissions,
  renderItemArchivePanel
}) => {
  return (
    <div style={containerStyles}>
      {submissions.map(renderItemArchivePanel)}
    </div>
  )
})

ItemArchivePanelList.propTypes = {
  submissions: PropTypes.array.isRequired
}

export default ItemArchivePanelList
