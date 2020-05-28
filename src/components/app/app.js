import React from 'react';
import Header from '../header';
import HomePage from '../home-page';
import ArticlePage from '../article-page';
import UserPage from '../user-page';
import './app.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <section className='main-content'>
          <Switch>
            <Route path='/' component={HomePage} exact />
            <Route path='/articles/:title' component={ArticlePage} />
            <Route path='/profiles/:username' component={UserPage} />
            <Route render={() => <h1>Page not fond</h1>} />
          </Switch>
        </section>
      </div>
    </Router>
  );
};

export default App;
