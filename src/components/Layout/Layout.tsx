import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { settings } = useSettings();

  return (
    <div
      style={{
        background: settings.backgroundColor,
        color: settings.mainTextColor,
      }}
      className="layout-container"
    >
      {children}
    </div>
  );
};

export default Layout;
