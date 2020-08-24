import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import Routes from "./routes";

const customHistory = createBrowserHistory();
customHistory.listen(_ => window.scrollTo(0, 0))

const MyRoutes = () => (
  <Router history={customHistory}>
    <Routes />
  </Router>
);

export default MyRoutes;
