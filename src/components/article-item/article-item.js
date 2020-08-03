import React from 'react';
import './article-item.css';
import { Link } from 'react-router-dom';
import Like from '../like';
import UserData from '../user-data';

const ArticleItem = ({
  props: {
    author,
    body,
    description,
    favorited,
    favoritesCount,
    createdAt,
    slug,
    tagList,
    title,
    updatedAt
  }
}) => {

  return (
    <div className='article-item'>
      <Like favorited={favorited} favoritesCount={favoritesCount} slug={slug} />
      <Link to={`/profiles/${author.username}`}>
        <UserData image={author.image} username={author.username} date={updatedAt} />
      </Link>
      <div className='article-data'>
        <Link to={`/articles/${slug}`}>
          <h3>{title}</h3>
          <p>{description}</p>
          <div className='read-more'>Read more...</div>
        </Link>
      </div>
    </div>
  );
};

export default ArticleItem;
