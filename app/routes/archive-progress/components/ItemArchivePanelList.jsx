import React, { PropTypes } from "react"
import ItemArchivePanel from "./ItemArchivePanel"

const containerStyles = {
  marginBottom: "100px"
}

const ItemArchivePanelList = ({
  submissions
}) => {
  return (
    <div style={containerStyles}>
      {submissions.map((submissionProps) => {
        return (
          <ItemArchivePanel key={submissionProps.id} {...submissionProps}/>
        )
      })}
    </div>
  )
}

ItemArchivePanelList.propTypes = {
  submissions: PropTypes.array.isRequired
}

export default ItemArchivePanelList
