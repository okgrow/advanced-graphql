import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Bucket from './Bucket';
import Map from './Map';

import './styles';

const App = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/bucket" component={Bucket} />
    <Route path="/map/:lat,:lng" component={Map} />
  </div>
);

export default App;
