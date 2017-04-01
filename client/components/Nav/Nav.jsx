import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
        <Link to="/">Main</Link>
        <Link to="/display">Display</Link>
        <Link to="/edit">Edit</Link>
        <Link to="/landing">Landing</Link>
    </div>
  );    
};

export default Nav;