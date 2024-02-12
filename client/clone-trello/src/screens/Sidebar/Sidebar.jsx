// Sidebar.jsx
import React from 'react';

const Sidebar = ({ showSidebar, toggleSidebar }) => {
  return (
    <div className={`sidebar ${showSidebar ? 'active' : ''}`}>
      <p>Sidebar Content</p>
    </div>
  );
};

export default Sidebar;
