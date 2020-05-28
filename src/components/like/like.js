import React from 'react';
import './like.css';

const Like = ({ favoritesCount, favorited, label = '' }) => {
  let style;
  if (favorited) style = 'like favorite';
  else style = 'like not-favorite';
  return (
    <div className={style}>
      <span>♥ {label} {favoritesCount}</span>
    </div>
  );
};

export default Like;

// &#9829
