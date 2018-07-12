import React from "react"
import PropTypes from "prop-types"

import ItemPanel from "../../shared/components/ItemPanel"

class Submission extends React.Component {
  constructor (props) {
    super(props)

    this.onCheckboxChange = this.onCheckboxChange.bind(this)
  }

  onCheckboxChange () {
    if (this.props.onSelectedChange) {
      this.props.onSelectedChange(!this.props.selected)
    }
  }

  render () {
    return (
      <ItemPanel
        imagePath={this.props.avatarUrl}
        title={this.props.displayName}
        subtitle={this.props.username}
      >
        <div className="float-right">
          <input
            type="checkbox"
            checked={this.props.selected}
            onChange={this.onCheckboxChange}
          />
        </div>
      </ItemPanel>
    )
  }
}

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
