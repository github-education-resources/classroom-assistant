import React, { PropTypes } from "react"
import ItemPanel from "../../../shared-components/ItemPanel"

const ItemArchivePanel = ({
  id,
  username,
  displayName,
  avatarUrl,
  repoUrl,
  selected
}) => (
  <ItemPanel
    imagePath={avatarUrl}
    title={username}
    subtitle={displayName}>
    <div className="progress">
      <div
        className="progress-bar"
        role="progressbar" aria-valuenow="70"
        aria-valuemin="0"
        aria-valuemax="100"
        style={{
          width: "70%"
        }}>
        <span className="sr-only">70% Complete</span>
      </div>
    </div>
  </ItemPanel>
)

ItemArchivePanel.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  repoUrl: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired
}

export default ItemArchivePanel
