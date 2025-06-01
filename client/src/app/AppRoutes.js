import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../components/Headers/Spinner';

const Login = lazy(() => import('./login/Login'));
const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const Company = lazy(() => import('./company'));
const DeliveryPartner = lazy(() => import('./deliverypartner'));
const Orders = lazy(() => import('./orders'));
const Reports = lazy(() => import('./reports/Main'));

class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/company" component={Company} />
          <Route path="/deliverypartner" component={DeliveryPartner} />
          <Route path="/orders" component={Orders} />
          <Route path="/reports" component={Reports} />
          <Redirect to="/login" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;