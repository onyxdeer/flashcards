import React from 'react';
import {Link} from 'react-router-dom';

const Nav = () => {
  return (
    <div>
        <Link to="/">Main</Link>
        <Link to="/display">Display</Link>
        <Link to="/examples">Edit</Link>
    </div>
  );    
};

export default Nav;