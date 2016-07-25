import React, { PropTypes } from "react"
import ItemPanel from "../../shared/components/ItemPanel"

import { compose, withHandlers } from "recompose"

const enchance = compose(
  withHandlers({
    onCheckboxChange: (props) => () => {
      if (props.onSelectedChange) {
        props.onSelectedChange(!props.selected)
      }
    }
  })
)

const Submission = enchance(({
  id,
  username,
  displayName,
  avatarUrl,
  repoUrl,
  selected,
  onSelectedChange,
  onCheckboxChange
}) => (
  <ItemPanel
    imagePath={avatarUrl}
    title={displayName}
    subtitle={username}
  >
    <div className="pull-right">
      <input
        type="checkbox"
        checked={selected}
        onChange={onCheckboxChange}
      />
    </div>
  </ItemPanel>
))

Submission.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  repoUrl: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelectedChange: PropTypes.func
}

export default Submission
