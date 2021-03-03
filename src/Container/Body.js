import React from 'react';
import "../App/App.css";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import Layout from './Layout';
import DetailsScreen from './DetailsScreen';


export default (props) => {
  
  return (
    <BrowserRouter>
      <main>
        {/* <BodyLayout/> */}
            <Switch>
              <Route exact path="/" component={Layout}/>
              <Route exact path="/details" component={DetailsScreen}/>
            </Switch>
      </main>
    </BrowserRouter>
  );
};