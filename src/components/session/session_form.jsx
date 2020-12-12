import React from "react"; 
import { withRouter } from "react-router-dom";

const VALID_EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class SessionForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            password2: "",
            firstnameError: false,
            lastnameError: false,
            emailError: false,
            passwordError: false,
            password2Error: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInput(field) {
        return (e) => this.setState({ [field]: e.currentTarget.value })
    }

    handleSubmit(e) {
        e.preventDefault();
        let user = this.state;

        this.props.processForm(user).then(
            () => {
                this.props.closeModal();
                // this.props.history.push('/') // need to figure out what route to go to
            }
        )
        // persist if something happens
        this.setState({
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: "",
            password2: ""
        })
    }

    handleOnBlur(field) {
        return (e) => {
            if (e.currentTarget === e.target) {
                switch( field) {
                    case "firstname":
                        this.setState({ firstnameError: this.state.firstname === "" })
                        break
                    case "lastname":
                        this.setState({ lastnameError: this.state.lastname === "" })
                        break
                    case "password":
                        this.setState({ passwordError: this.state.password.length < 3 })
                        break
                    case "password2":
                        this.setState({ password2Error: this.state.password !== this.state.password2 })
                        break
                    case "email":
                        this.setState({ emailError: !this.state.email.match(VALID_EMAIL_REGEX) })
                        break
                    default:
                        // Do nothing
                        return;
                }
            }
        }
    }

    render() {
        const firstName = (this.props.formType === 'signup') ? (
            <label className="input-field">First Name:
                <input type="text" 
                className={this.state.firstnameError ? 'form-field-error' : ''}
                onChange={this.handleInput('firstname')}
                value={this.state.firstname}
                onBlur={this.handleOnBlur('firstname')}/>
            </label>
        ) : ( null )

        const lastName = (this.props.formType === 'signup') ? (
            <label className="input-field"> Last Name:
                <input type="text" 
                className={this.state.lastnameError ? 'form-field-error' : ''}
                onChange={this.handleInput('lastname')} 
                value={this.state.lastname}
                onBlur={this.handleOnBlur('lastname')}/>
            </label>
        ) : (null)

        const email = (
            <label className="input-field"> Email:
                <input type="text" 
                className={this.state.emailError ? 'form-field-error' : ''}
                onChange={this.handleInput('email')} 
                onBlur={this.handleOnBlur('email')}
                />
            </label>
        )

        const password = (
            <label className="input-field"> Password:
                <input type="password" 
                className={this.state.passwordError ? 'form-field-error' : ''}
                onChange={this.handleInput('password')} 
                onBlur={this.handleOnBlur('password')}
                />
            </label>
        )

        const secondPassword = (this.props.formType === 'signup') ? (
            <label className="input-field"> Confirm Password:
                <input type="password" 
                className={this.state.password2Error ? 'form-field-error' : ''}
                onChange={this.handleInput('password2')}
                onBlur={this.handleOnBlur('password2')}
                value={this.state.password2} />
            </label>
        ) : (null)

        
        // figure out where to autofocus
        const otherButton = (this.props.formType === 'login' ) ? (
            <p className="other-form">Don't have an account yet? <span onClick={this.props.otherForm}>Sign up!</span></p>
        ) : (
            <p className="other-form">Already have an account? <span onClick={this.props.otherForm}>Log in!</span></p>
        )
        return (
            <>
                <div className="login-form-container">
                    <form className="login-form-box" onSubmit={this.handleSubmit}>
                        <div className="header-form">
                            <h1>J J | S T U D I O</h1>
                            <p>Make beats</p>
                        </div>
                        {firstName}
                        {lastName}
                        {email}
                        {password}
                        {secondPassword}

                        {otherButton}

                        <input type="submit" value={this.props.formType === "signup" ? "Sign Up" : "Log In"} id="submit-button" />                            
                    </form>
                </div>
            </>
        )
    }
}

export default withRouter(SessionForm)