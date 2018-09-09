import React from "react"
import PropTypes from "prop-types"

class SelectAllPanel extends React.Component {
  constructor (props) {
    super(props)

    this.onCheckboxChange = this.onCheckboxChange.bind(this)
  }

  onCheckboxChange () {
    if (this.props.onSelectAllChange) {
      this.props.onSelectAllChange(!this.props.selectAll)
    }
  }

  render () {
    return (
      <div className="select-all-panel-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-6">
              {this.props.selected}/{this.props.total} selected
            </div>
            <div className="col-6">
              <div className="float-right">
                Select All
                <input
                  className="select-all-panel-checkbox"
                  type="checkbox"
                  checked={this.props.selectAll}
                  onChange={this.onCheckboxChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SelectAllPanel.propTypes = {
  selected: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  selectAll: PropTypes.bool.isRequired,
  onSelectAllChange: PropTypes.func
}

export default SelectAllPanel
