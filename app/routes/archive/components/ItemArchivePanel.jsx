import React from "react"
import PropTypes from "prop-types"

import Spinner from "../../shared/components/Spinner"
import ItemPanel from "../../shared/components/ItemPanel"
import ProgressBar from "../../shared/components/ProgressBar"

const avatarURL = (assignmentType, username) => {
  if (assignmentType == "group"){
    return `https://avatars.githubusercontent.com/t/${username}?v=3&size=96`
  } else {
    return `https://avatars.githubusercontent.com/${username}?v=3&size=96`
  }
}

const ItemArchivePanel = (props, context) => {
  let progressElement

  if (props.cloneProgress === 0 && !props.cloneStatus) {
    progressElement = (
      <Spinner className={`archive-item-archive-panel-spinner ${(props.cloneStatus ? "mt-0" : "mt-3")}`}/>
    )
  } else if (props.cloneProgress > 0 && props.cloneProgress < 100) {
    progressElement = (
      <ProgressBar
        className="archive-item-archive-panel-progress-bar"
        cloneProgress={props.cloneProgress}
        showPercentage={false}
      />
    )
  } else if (props.cloneProgress === 100) {
    progressElement = (
      <button className="btn btn-sm btn-primary archive-item-archive-panel-button" onClick={props.onViewClick}>
        <i className="fa fa-folder-open" aria-hidden="true"></i> View
      </button>
    )
  }

  return (
    <ItemPanel
      imagePath={avatarURL(props.assignmentType, props.username)}
      title={props.username}
      subtitle={props.displayName}
    >
      <div className="pull-right archive-item-archive-panel-container align-self-center">
        { props.cloneStatus &&
          <div>
            <p className="archive-item-archive-panel-status">{props.cloneStatus}</p>
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
