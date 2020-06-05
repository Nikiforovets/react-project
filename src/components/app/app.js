import React from 'react';
import Header from '../header';
import HomePage from '../home-page';
import ArticlePage from '../article-page';
import LoginPage from '../login-page';
import RegisterPage from '../register-page';
import UserPage from '../user-page';
import NewArticlePage from '../new-article-page';
import Settings from '../settings';
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
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/editor' component={NewArticlePage} />
            <Route path='/settings' component={Settings} />
            <Route render={() => <h1>Page not fond</h1>} />
          </Switch>
        </section>
      </div>
    </Router>
  );
};

export default App;
