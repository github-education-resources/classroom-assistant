import React, { PropTypes } from "react"
import { compose, withHandlers } from "recompose"

const styles = {
  paddingLeft: "20px",
  paddingRight: "20px",
  paddingTop: "10px",
  paddingBottom: "10px"
}

const checkboxStyles = {
  marginLeft: "5px"
}

const enchance = compose(
  withHandlers({
    onSelectAllChange: (props) => () => {
      props.onSelectAllChange(!props.selectAll)
    }
  })
)

const SelectAllPanel = enchance(({
  selected,
  total,
  selectAll,
  onSelectAllChange
}) => (
  <div style={styles}>
    <div className="row">
      <div className="col-xs-6">
        {selected}/{total} selected
      </div>
      <div className="col-xs-6">
        <div className="pull-right">
          Select All
          <input
            style={checkboxStyles}
            type="checkbox"
            checked={selectAll}
            onClick={onSelectAllChange}
            readOnly={true}
          />
        </div>
      </div>
    </div>
  </div>
))

SelectAllPanel.propTypes = {
  selected: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  selectAll: PropTypes.bool.isRequired,
  onSelectAllChange: PropTypes.func
}

export default SelectAllPanel
