import React from 'react';

interface ArrowIconProps {
  color: string;
  width?: number;
  height?: number;
}

const ArrowIcon: React.FC<ArrowIconProps> = ({ color, width = 24, height = 12 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginRight: '8px' }}
  >
    <path
      d="M1 6H21M21 6L16 1M21 6L16 11"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowIcon;
