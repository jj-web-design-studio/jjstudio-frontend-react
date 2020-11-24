import { connect } from "react-redux";
import AppNavBar from "./navbar";
import { logout } from "../../actions/session_actions";
import { openModal } from '../../actions/modal_action';

const mapStateToProps = (state) => {
    // let sessionId = state.session.id
    return ({
        // user: state.entities.users[sessionId]
    })
}
// will need this when they have a logged in usuer

const mapDispatchToProps = (dispatch) => {

    return ({
        openModal: (modal) => dispatch(openModal(modal)),
        logout: () => dispatch(logout())
    })

}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavBar)