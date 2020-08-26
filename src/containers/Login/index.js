import { connect } from "react-redux";
import React, { Component } from "react";

import { request as login_user } from "../../redux/actions/Login";
import { DotsLoader, InputField, CustomButton } from "../../components";
import { SuccessHelper, ErrorHelper } from "../../helpers";
import { emailRegex, passwordRegex, validate } from "../../utils/validation";

class Login extends Component {
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
    if (nextProps.login) {
      if (
        !nextProps.login.failure &&
        !nextProps.login.isFetching &&
        !nextProps.login.errorMessage &&
        nextProps.login.data
      ) {
        sessionStorage.setItem("user", JSON.stringify(nextProps.login.data));
        SuccessHelper.handleSuccess("You have successfully logged in.", true);
        this.props.history.push("/");
        this.setState({ isloading: false, email: "", password: "" });
      } else if (
        nextProps.login.failure &&
        !nextProps.login.isFetching &&
        nextProps.login.errorMessage
      ) {
        ErrorHelper.handleErrors("Invalid email or password", true);
        this.setState({ isloading: false });
      }
    }
  }

  async componentDidMount() {
    const user = await JSON.parse(sessionStorage.getItem("user"));
    if (user && user.token) {
      this.handleNavigation("/");
    }
  }

  handleNavigation = (route) => {
    this.props.history.push(route);
  }

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

  handleLogin = (event) => {
    event.preventDefault()
    const { email, password, emailError, passwordError } = this.state;
    if (!emailError && !passwordError) {
      this.setState({ isloading: true });
      this.props.login_user({ email, password });
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
            <h2 className="h4 border-bottom pb-2 text-center">Log In</h2>
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
              <CustomButton btnText={"Log In"} btntype={"submit"} onClick={(event) => this.handleLogin(event)} />
            </form>
            <p className="my-2">
              <small>You don't have an account yet?</small>
              <strong
                className="ml-1 text-primary"
                style={{ cursor: 'pointer' }}
                onClick={()=>this.handleNavigation('/register')}
              >Register here!</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ login: state.login });

const action = { login_user };

export default connect(mapStateToProps, action)(Login);
