import React, { Suspense } from "react";
import { Layout } from "antd";

import { Switch, Route } from "react-router-dom";
import NotFound from "../components/Exception/NotFound";

import AuthRoute from "../components/AuthRoute";

const Home = React.lazy(() => import("../pages/home"));
const Form = React.lazy(() => import("../pages/form"));
const Table = React.lazy(() => import("../pages/table"));
const Menu = React.lazy(() => import("../pages/menu"));
const Exception = React.lazy(() => import("../pages/exception"));
const Auth = React.lazy(() => import("../pages/system/auth"));
const Account = React.lazy(() => import("../pages/system/account"));
const Role = React.lazy(() => import("../pages/system/role"));

const { Content } = Layout;

const AppContent = () => {
  return (
    <Content className="main">
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <AuthRoute path="/home" component={Home} />
          <AuthRoute path="/form" component={Form} />
          <AuthRoute path="/table" component={Table} />
          <AuthRoute path="/menu/menu2" component={Menu} />
          <AuthRoute path="/menu/menu1/menu1-1" component={Menu} />
          <AuthRoute path="/menu/menu1/menu1-2" component={Menu} />
          <AuthRoute path="/system/account" component={Account} />
          <AuthRoute path="/system/auth" component={Auth} />
          <AuthRoute path="/system/role" component={Role} />
          <Route path="/exception/:code" component={Exception} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Content>
  );
};
export default AppContent;
