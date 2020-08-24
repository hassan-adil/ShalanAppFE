import { connect } from "react-redux";
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Register from "../containers/Register";
import Login from "../containers/Login";
import User from "../containers/User";
import Employee from "../containers/Employee";
import EmployeeReport from "../containers/EmployeeReport";
import HierarchicalEmployeeReport from "../containers/HierarchicalEmployeeReport";

const isUser = { isAuthenticated: false };

const isUserAuthenticate = async () => {
  const userData = await JSON.parse(sessionStorage.getItem("user"));
  if (userData && userData.token && userData.role === 'Admin') {
    isUser.isAuthenticated = true;
  } else {
    isUser.isAuthenticated = false;
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  let user = rest.props;
  let isAuthenticated = user && user.isAdmin;
  isUserAuthenticate();
  return (
    <Route
      exact
      {...rest}
      render={(props) =>
        isAuthenticated || (isUser && isUser.isAuthenticated) ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          )
      }
    />
  );
};

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.login) {
      if (
        !nextProps.login.failure &&
        !nextProps.login.isFetching &&
        !nextProps.login.errorMessage &&
        nextProps.login.data &&
        nextProps.login.data.token &&
        nextProps.login.data.role === 'Admin'
      ) {
        this.setState({ user: nextProps.login.data.data });
      }
    }
  }

  render() {
    const { user } = this.state;
    return (
      <Switch>
        <Route
          exact
          path="/register"
          component={Register}
          props={user}
        ></Route>
        <Route
          exact
          path="/login"
          component={Login}
          props={user}
        ></Route>
        <PrivateRoute
          exact
          path="/"
          component={User}
          props={user}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/employment"
          component={Employee}
          props={user}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/employee-report"
          component={EmployeeReport}
          props={user}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/hierarchical-employee-report"
          component={HierarchicalEmployeeReport}
          props={user}
        ></PrivateRoute>
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({ login: state.login });

const action = {};

export default connect(mapStateToProps, action)(Routes);
