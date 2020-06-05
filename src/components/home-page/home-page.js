import React from 'react';
import ArticleList from '../article-list';

class HomePage extends React.Component {
    redirect = () => {
        this.props.history.push('/login');
    }

    render() {
        return (<div>
            <div className='banner'>
                <h1>My app</h1>
                <h3>The best app in the world</h3>
            </div>
            <ArticleList redirect={this.redirect} />
        </div >)
    }
}

export default HomePage;