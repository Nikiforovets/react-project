import React from 'react';
import './header.css';

const Header = () => {
  return (
    <header className='header'>
      <h2 className='logo'>My app</h2>
      <ul>
        <li>Home</li>
        <li>Sign in</li>
        <li>Sign up</li>
      </ul>
    </header>
  );
};

export default Header;
