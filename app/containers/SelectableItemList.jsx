import { connect } from "react-redux"
import { selectItem } from "../actions"
import ItemList from "../components/ItemList"

const mapStateToProps = (state) => {
  return {
    items: state.items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleItemClick: (id) => {
      dispatch(selectItem(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList)
