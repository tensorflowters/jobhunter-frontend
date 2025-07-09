import React from 'react';
import { Outlet } from '@tanstack/react-router';
import { DashboardLayout } from './components/layout/dashboard-layout';

function App() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}

export default App;
