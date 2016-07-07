import React, { PropTypes } from "react"

const styles = {
  paddingLeft: "20px",
  paddingRight: "20px",
  paddingTop: "10px",
  paddingBottom: "10px"
}

const checkboxStyles = {
  marginLeft: "5px"
}

const SelectAllPanel = ({
  selected,
  total
}) => (
  <div style={styles}>
    <div className="row">
      <div className="col-xs-6">
        {selected}/{total} selected
      </div>
      <div className="col-xs-6">
        <div className="pull-right">
          Select All <input style={checkboxStyles} type="checkbox" checked={true} readOnly={true}/>
        </div>
      </div>
    </div>
  </div>
)

SelectAllPanel.propTypes = {
  selected: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
}

export default SelectAllPanel
