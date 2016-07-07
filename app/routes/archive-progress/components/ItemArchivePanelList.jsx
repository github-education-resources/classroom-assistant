import React, { PropTypes } from "react"
import ItemArchivePanel from "./ItemArchivePanel"

const ItemArchivePanelList = ({
  submissions
}) => {
  return (
    <div>
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
