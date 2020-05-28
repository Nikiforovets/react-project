import React from 'react';
import ArticleList from '../article-list';

const HomePage = () => {
    return (<div>
        <div className='banner'>
            <h1>My app</h1>
            <h3>The best app in the world</h3>
        </div>
        <ArticleList />
    </div>)
}

export default HomePage;