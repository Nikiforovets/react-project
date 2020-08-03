import React, { useState } from 'react';
import SwapService from '../../services/swap-service'
import { withRouter } from "react-router-dom";
import './like.css';

const Like = ({ favoritesCount, favorited, label = '', slug, history }) => {
  const swapService = new SwapService();
  let style;
  if (favorited) style = 'like favorite';
  else style = 'like not-favorite';

  const [likeCount, setLikeCount] = useState(favoritesCount);
  const [likeStyle, setLikeStyle] = useState(style);

  const likeArticle = () => {
    if (localStorage.getItem('token')) {
      if (likeStyle === 'like favorite') {
        swapService.deleteLike(slug);
        setLikeCount(likeCount - 1);
        setLikeStyle('like not-favorite');
      } else {
        swapService.postLike(slug);
        setLikeCount(likeCount + 1);
        setLikeStyle('like favorite');
      }
    } else {
      history.push('/login');
    }
  }

  return (
    <div onClick={likeArticle} className={likeStyle}>
      <span>♥ {label} {likeCount}</span>
    </div>
  );
};

export default withRouter(Like);

// &#9829
