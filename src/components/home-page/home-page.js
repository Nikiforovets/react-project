import React from 'react';
import ArticleList from '../article-list';

const HomePage = ({ history }) => {

    let banner = null;
    if (!localStorage.getItem('token')) {
        banner = <div className='banner'>
            <h1>My app</h1>
            <h3>The best app in the world</h3>
        </div>
    }

    const yourFeed = {
        url: '/feed?',
        name: 'Your Feed',
        identificator: 'your-feed',
        requireAuthorization: true
    }

    const globalFeed = {
        url: '?',
        name: 'Global Feed',
        identificator: 'global-feed',
        requireAuthorization: false
    }

    return (
        <div>
            {banner}
            <ArticleList history={history} firstTab={yourFeed} secondTab={globalFeed} />
        </div >)

}

export default HomePage;