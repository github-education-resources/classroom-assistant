import { connect } from "react-redux"
import EditItemPanel from "../../common/components/EditItemPanel"

import * as selectors from "../selectors"

const mapStateToProps = (state) => {
  return {
    title: `${selectors.numSelected(state)}/${selectors.num(state)}`,
    iconPath: "http://placehold.it/48x48",
    subtitle: "Submissions Selected"
  }
}

export default connect(mapStateToProps, null)(EditItemPanel)
