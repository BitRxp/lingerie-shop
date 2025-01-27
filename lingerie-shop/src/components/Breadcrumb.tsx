import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumb.scss';

interface BreadcrumbProps {
  paths: { label: string; path?: string }[]; // `path` може бути необов'язковим
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ paths }) => {
  return (
    <nav aria-label="breadcrumb" className="breadcrumb">
      {paths.map((path, index) => (
        <span key={index} className="breadcrumb-item">
          {path.path && index < paths.length - 1 ? (
            <>
              <Link to={path.path}>{path.label}</Link>
              <span className="breadcrumb-separator">•</span>
            </>
          ) : (
            <span className="breadcrumb-current">{path.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
