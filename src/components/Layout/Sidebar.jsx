import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard/menu">مدیریت منو</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/orders">سفارشات</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;