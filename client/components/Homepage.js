import React from 'react';
import NavigationBar from './NavigationBar';

const Homepage = ({ children }) => (
  <div className="container">
    <NavigationBar />
    {children}
  </div>
);

Homepage.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default Homepage;
