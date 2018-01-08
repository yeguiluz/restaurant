import React, { Component } from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';

import Home from '../components/Home';
import Login from '../components/Login';
import Dining from '../components/Dining';
import Orders from '../components/Orders';
import OrdersList from '../components/OrdersList';
import OrderDetail from '../components/OrderDetail';
import Users from '../components/Users';
import UsersList from '../components/UsersList';

class Routies extends Component{
  render(){
    return(
      <main>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/home" component={Home}/>
          <Route path="/dining" component={Dining}/>
          <Route path="/orders/create" component={Orders}/>
          <Route path="/orders/:id" component={OrderDetail}/>
          <Route path="/orders" component={OrdersList}/>
          <Route path="/users/create" component={Users}/>
          <Route path="/users" component={UsersList}/>
        </Switch>
      </main>
    );
  }
}
export default withRouter(Routies);
