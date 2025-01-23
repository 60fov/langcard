import type { Component } from 'solid-js';
import { Router, Route } from '@solidjs/router';

import WordMatcher from './games/WordMatcher';
import Scattergories from './games/Scattergories';

const App: Component = () => {
  return (
    <Router>
      <Route path="/" component={WordMatcher} />
      <Route path="/scattergories" component={Scattergories} />
    </Router>
  );
};

export default App;
