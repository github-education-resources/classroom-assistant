import React, { PropTypes } from "react"
import classNames from "classnames"
import ItemPanel from "../../../shared-components/ItemPanel"

const containerStyles = {
  marginTop: "10px"
}

const ItemArchivePanel = ({
  id,
  username,
  displayName,
  avatarUrl,
  repoUrl,
  selected,
  progress
}) => {
  let viewButton, barColorClass

  if (progress === 100) {
    barColorClass = "progress-bar-success"
    viewButton = (
      <div className="col-sm-4">
        <button className="btn btn-xs btn-primary">
          <i className="fa fa-folder-open" aria-hidden="true"></i> View
        </button>
      </div>
    )
  } else {
    barColorClass = "progress-bar-info"
    viewButton = (
      <p> Archiving.. </p>
    )
  }

  return (
    <ItemPanel
      imagePath={avatarUrl}
      title={username}
      subtitle={displayName}
    >
      <div className="row" style={containerStyles}>
        <div className="col-sm-8">
          <div className="progress">
            <div
              className={classNames("progress-bar", barColorClass)}
              role="progressbar" aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{
                width: progress + "%"
              }}
            >
              {progress}%
            </div>
          </div>
        </div>
        {viewButton}
      </div>
    </ItemPanel>
  )
}

ItemArchivePanel.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  repoUrl: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired
}

export default ItemArchivePanel