import React from 'react';
import "../App/App.css";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import DetailsScreen from './DetailsScreen';
import Login from './Login';


export default (props) => {
  
  return (
    <BrowserRouter>
      <main>
        {/* <BodyLayout/> */}
            <Switch>
              <Route exact path="/" component={Login}/>
              <Route exact path="/details" component={DetailsScreen}/>
            </Switch>
      </main>
    </BrowserRouter>
  );
};