import React from "react"
import PropTypes from "prop-types"

import Spinner from "../../shared/components/Spinner"
import ItemPanel from "../../shared/components/ItemPanel"
import ProgressBar from "../../shared/components/ProgressBar"

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

  if (cloneProgress === 0 && !cloneStatus) {
    progressElement = (
      <Spinner className={`archive-item-archive-panel-spinner ${(cloneStatus ? "mt-0" : "mt-3")}`}/>
    )
  } else if (cloneProgress > 0 && cloneProgress < 100) {
    progressElement = (
      <ProgressBar
        className="archive-item-archive-panel-progress-bar"
        cloneProgress={cloneProgress}
        showPercentage={false}
      />
    )
  } else if (cloneProgress === 100) {
    progressElement = (
      <button className="btn btn-sm btn-primary archive-item-archive-panel-button" onClick={onViewClick}>
        <i className="fa fa-folder-open" aria-hidden="true"></i> View
      </button>
    )
  }

  return (
    <ItemPanel
      imagePath={avatarUrl}
      title={username}
      subtitle={displayName}
    >
      <div className="pull-right archive-item-archive-panel-container align-self-center">
        { cloneStatus &&
          <div>
            <p className="archive-item-archive-panel-status">{cloneStatus}</p>
          </div>
        }
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
