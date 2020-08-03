import React from 'react';
import './new-article-page.css';
import SwapService from '../../services/swap-service';
import { Router, browserHistory } from 'react-router';
import ErrorsValidation from '../errors-validation';

class NewArticlePage extends React.Component {
    swapService = new SwapService();

    state = {
        title: '',
        description: '',
        text: '',
        tags: '',
        errors: ''
    }

    updateFields = e => {
        if (e.target.className === "title") {
            this.setState({ title: e.target.value });
        }
        if (e.target.className === "description") {
            this.setState({ description: e.target.value });
        }
        if (e.target.className === "text") {
            this.setState({ text: e.target.value });
        }
        if (e.target.className === "tags") {
            this.setState({ tags: e.target.value });
        }
    };

    onSubmit = (e) => {
        const { title, description, text, tags } = this.state;
        e.preventDefault();
        this.swapService.postNewArticle(title, description, text, tags)
            .then((data) => {
                if (data.errors) {
                    this.setState({
                        errors: data.errors
                    })
                } else {
                    this.setState({
                        errors: ''
                    });
                    this.props.history.push(`/articles/${data.article.slug}`);
                }
            });
        this.setState({
            title: '',
            description: '',
            text: '',
            tags: ''
        })
    }

    render() {
        return (
            <div className='article-page'>
                <ErrorsValidation errors={this.state.errors} />
                <form className='article-form' onSubmit={this.onSubmit}>
                    <input
                        type='text'
                        className='title'
                        onChange={this.updateFields}
                        placeholder='Article Title'>
                    </input>
                    <input
                        type='text'
                        className='description'
                        onChange={this.updateFields}
                        placeholder='What this article about?'>
                    </input>
                    <textarea
                        type='text'
                        style={{ height: '150px' }}
                        className='text' onChange={this.updateFields}
                        placeholder='Write your article (in markdown)'>
                    </textarea>
                    <input
                        type='text'
                        className='tags'
                        onChange={this.updateFields}
                        placeholder='Enter tags'>
                    </input>
                    <button>Publish Article</button>
                </form >
            </div>
        )
    }
}

export default NewArticlePage;