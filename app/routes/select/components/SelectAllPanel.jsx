import React from "react"
import PropTypes from "prop-types"

const styles = {
  paddingLeft: "20px",
  paddingRight: "20px",
  paddingTop: "10px",
  paddingBottom: "10px"
}

const checkboxStyles = {
  marginLeft: "5px"
}

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
      <div style={styles}>
        <div className="row">
          <div className="col-xs-6">
            {this.props.selected}/{this.props.total} selected
          </div>
          <div className="col-xs-6">
            <div className="pull-right">
              Select All
              <input
                style={checkboxStyles}
                type="checkbox"
                checked={this.props.selectAll}
                onChange={this.onCheckboxChange}
              />
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
