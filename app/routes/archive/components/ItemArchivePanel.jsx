import React from "react"
import PropTypes from "prop-types"

import { RingLoader } from "react-spinners"
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

  if (cloneProgress === 0) {
    progressElement = (
      <div style={{
        width: "20px",
        height: "20px"
      }}
      >
        <RingLoader
          color={"#000"}
          loading={true}
          size={30}
        />
      </div>
    )
  } else if (cloneProgress > 0 && cloneProgress < 100) {
    progressElement = (
      <div style = {{
        width: "160px"
      }}
      >
        <ProgressBar cloneProgress={cloneProgress}/>
      </div>
    )
  } else {
    progressElement = (
      <button className="btn btn-sm btn-primary my-0" onClick={onViewClick}>
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
      <div className="pull-right">
        <p className="pull-right my-0">{cloneStatus}</p>
        <br/>
        <div className="pull-right">
          {progressElement}
        </div>
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
