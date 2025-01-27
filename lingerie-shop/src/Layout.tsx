import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

interface LayoutProps {
  children: React.ReactNode; // Пропс для вкладених компонентів
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header /> {/* Відображення Header */}
      <main style={{ minHeight: 'calc(100vh - 200px)' }}>{children}</main> {/* Контент */}
      <Footer /> {/* Відображення Footer */}
    </>
  );
};

export default Layout;
