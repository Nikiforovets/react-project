import React from 'react';
import './pagination-item.css';

const PaginationItem = ({ number, changePage, currentPage }) => {
  const setClassName = () => {
    if (number === currentPage) {
      return 'pagination-btn current';
    } else {
      return 'pagination-btn';
    }
  };
  return (
    <button className={setClassName()} onClick={() => changePage(number)}>
      {number}
    </button>
  );
};

export default PaginationItem;
