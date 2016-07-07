import React, { PropTypes } from "react"
import ItemPanel from "../../../shared-components/ItemPanel"

const Submission = ({
  id,
  username,
  displayName,
  avatarUrl,
  repoUrl,
  selected
}) => (
  <ItemPanel
    imagePath={avatarUrl}
    title={displayName}
    subtitle={username}
  >
    <div className="pull-right">
      <input type="checkbox" checked={selected} readOnly={true}/>
    </div>
  </ItemPanel>
)

Submission.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  repoUrl: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired
}

export default Submission
