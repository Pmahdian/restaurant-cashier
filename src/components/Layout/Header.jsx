import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../UI/Button';

const Header = () => {
  const { logout } = useAuth();

  return (
    <header className="app-header">
      <h1>سیستم صندوق رستوران</h1>
      <Button variant="danger" onClick={logout}>
        خروج
      </Button>
    </header>
  );
};

export default Header;