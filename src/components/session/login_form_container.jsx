import SessionForm from "./session_form"
import { connect } from "react-redux";
import { login, clearErrors } from "../../actions/session_actions";
import { openModal, closeModal } from '../../actions/modal_action';


const mapStateToProps = (state) => {
    let errors = state.errors.session;
    return {
        errors: errors,
        formType: 'login'
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processForm: (user) => dispatch(login(user)),
        clearErrors: () => dispatch(clearErrors()),
        otherForm: (() => dispatch(openModal('signup'))
            // <p onClick={() => dispatch(openModal('signup'))} className="header-button">
            //     Sign Up!
            // </p>
        ),
        closeModal: () => dispatch(closeModal()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)