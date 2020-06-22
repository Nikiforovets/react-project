import React from 'react';
import ArticleList from '../article-list';

const HomePage = ({ history }) => {

    const redirect = () => {
        history.push('/login');
    }

    let banner = null;
    if (!localStorage.getItem('token')) {
        banner = <div className='banner'>
            <h1>My app</h1>
            <h3>The best app in the world</h3>
        </div>
    }

    return (
        <div>
            {banner}
            <ArticleList redirect={redirect} />
        </div >)

}

export default HomePage;