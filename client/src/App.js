import React, {Component} from 'react';

// Router components
import {Link, Switch, Route} from 'react-router-dom';

// Components representing the simpler site routes.
import {Home} from './routes/home.js';
import {Service} from './routes/service.js';
import {OldProduct} from './routes/oldproduct.js';
import {Contact} from './routes/contact.js';
import {Demo} from "./routes/demo";

// Styling
import './App.css';

/* Establish routing for the site */
const App = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/contact' component={Contact}/>
      <Route exact path='/demo' component={Demo}/>
      <Route exact path='/service' component={Service}/>
      <Route exact path='/oldproduct' component={OldProduct}/>
    </Switch>
  </main>
);

export default App;
