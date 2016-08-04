import React, { PropTypes } from "react"
import ItemPanel from "../../shared/components/ItemPanel"

const ItemArchivePanel = ({
  id,
  username,
  displayName,
  avatarUrl,
  repoUrl,
  cloneProgress,
  cloneStatus,
  onViewClick
}) => {
  let progressElement

  if (cloneProgress === 100) {
    progressElement = (
      <div className="pull-right">
        <button className="btn btn-xs btn-primary" onClick={onViewClick}>
          <i className="fa fa-folder-open" aria-hidden="true"></i> View
        </button>
      </div>
    )
  } else {
    progressElement = (
      <div className="progress pull-right">
        <div
          className="progress-bar progress-bar-info"
          role="progressbar" aria-valuenow={cloneProgress}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{
            width: cloneProgress + "%"
          }}
        >
          {cloneProgress}%
        </div>
      </div>
    )
  }

  return (
    <ItemPanel
      imagePath={avatarUrl}
      title={username}
      subtitle={displayName}
    >
      <div className="pull-right">
        <p class="pull-right">{cloneStatus}</p>
        {progressElement}
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
  cloneProgress: PropTypes.number.isRequired,
  cloneStatus: PropTypes.string.isRequired,
  onViewClick: PropTypes.func
}

export default ItemArchivePanel
