import { connect } from "react-redux";
import React, { Component } from "react";

import { request as register_user } from "../../redux/actions/Register";
import { DotsLoader, InputField, CustomButton } from "../../components";
import { SuccessHelper, ErrorHelper } from "../../helpers";
import { emailRegex, passwordRegex, validate } from "../../utils/validation";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
            isloading: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.register) {
            if (
                !nextProps.register.failure &&
                !nextProps.register.isFetching &&
                !nextProps.register.errorMessage &&
                nextProps.register.data
            ) {
                SuccessHelper.handleSuccess('Thank you! Your account has been successfully created.', true);
                this.props.history.push("/login");
                sessionStorage.setItem("user", JSON.stringify(nextProps.register.data.data));
                this.setState({ isloading: false, email: "", password: "" });
            } else if (
                nextProps.register.failure &&
                !nextProps.register.isFetching &&
                nextProps.register.errorMessage
            ) {
                ErrorHelper.handleErrors("Invalid email or password", true);
                this.setState({ isloading: false });
            }
        }
    }

    async componentDidMount() {
        const user = await JSON.parse(sessionStorage.getItem('user'));
        if (user && user.token) {
            this.handleNavigation('/')
        }
    }

    handleNavigation = (route) => {
        this.props.history.push(route);
    };

    onChangeEmail = async (event) => {
        this.setState({ email: event.target.value })
        this.setState({
            emailError: await validate(
                event.target.value,
                emailRegex,
                'Please enter a valid email',
            ),
        });
    };

    onChangePassword = async (event) => {
        this.setState({ password: event.target.value })
        this.setState({
            passwordError: await validate(
                event.target.value,
                passwordRegex,
                'Password must be at least 6 characters.',
            ),
        });
    };

    handleRegister = (event) => {
        event.preventDefault()
        const { email, password, emailError, passwordError } = this.state;
        if (!emailError && !passwordError) {
            this.setState({ isloading: true });
            this.props.register_user({ email, password });
        }
    };

    renderLoader = () => {
        const { isloading } = this.state;
        return <DotsLoader isloading={isloading} />;
    };

    render() {
        const { email, password, emailError, passwordError } = this.state;
        return (
            <div className="container-fluid bg-light">
                {this.renderLoader()}
                <div className="container px-0 min-vh-100 d-flex justify-content-center align-items-center">
                    <div className="col-md-5 bg-white p-4 rounded shadow-lg">
                        <h2 className="h4 border-bottom pb-2 text-center">Register</h2>
                        <form>
                            <InputField
                                label={"Email"}
                                value={email}
                                id={"email"}
                                ariaDescribedby={"emailErr"}
                                placeholder={"Enter your email"}
                                type={"email"}
                                onChange={this.onChangeEmail}
                                errorMessage={emailError}
                            />
                            <InputField
                                label={"Password"}
                                value={password}
                                id={"password"}
                                ariaDescribedby={"passwordErr"}
                                placeholder={"Enter your password"}
                                type={"password"}
                                onChange={this.onChangePassword}
                                errorMessage={passwordError}
                            />
                            <CustomButton btnText={"Register"} btntype={"submit"} onClick={(event) => this.handleRegister(event)} />
                        </form>
                        <p className="my-2">
                            <small>Already have an account?</small>
                            <strong
                                className="ml-1 text-primary"
                                style={{ cursor: 'pointer' }}
                                onClick={() => this.handleNavigation('/login')}
                            >Login here!</strong>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ register: state.register });


const action = { register_user };

export default connect(mapStateToProps, action)(Register);
