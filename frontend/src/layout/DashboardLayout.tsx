import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-surface text-white">
      <div className="flex min-h-screen">
        <Sidebar collapsed={collapsed} />
        <div className="flex min-h-screen flex-1 flex-col">
          <Navbar onToggle={() => setCollapsed((prev) => !prev)} />
          <main className="grow overflow-y-auto p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
