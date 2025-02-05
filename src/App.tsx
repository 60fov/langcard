import type { Component } from 'solid-js';
import { Router, Route } from '@solidjs/router';

import WordMatcher from './pages/WordMatcher';
import Scattergories from './pages/Scattergories';
import Snake from './pages/Snake';
import Dictionary from './pages/Dictionary';
import LangWare from './pages/LangWare';

const App: Component = () => {
  return (
    <Router>
      <Route path="/" component={WordMatcher} />
      <Route path="/scattergories" component={Scattergories} />
      <Route path="/snake" component={Snake} />
      <Route path="/dictionary" component={Dictionary} />
      <Route path="/langware" component={LangWare} />
    </Router>
  );
};

export default App;
