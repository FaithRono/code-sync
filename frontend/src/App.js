import React from 'react';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div>
      {/* Your common components like Navbar, Sidebar, etc. */}
      <Outlet /> {/* This will render the matched child routes */}
    </div>
  );
};

export default App;
