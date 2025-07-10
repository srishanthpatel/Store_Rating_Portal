import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import AdminDashboard from './pages/AdminDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import UserStoreList from './pages/UserStoreList';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/signup" component={SignupForm} />
        <Route exact path="/admin/dashboard" component={AdminDashboard} />
        <Route exact path="/owner/dashboard" component={OwnerDashboard} />
        <Route exact path="/user/stores" component={UserStoreList} />
        <Redirect to="/login" />
      </Switch>
    );
  }
}

export default App;
