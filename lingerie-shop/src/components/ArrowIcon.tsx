import React from 'react';

interface ArrowIconProps {
  color?: string; // Колір буде встановлюватися через стилі, якщо не передано
  width?: number;
  height?: number;
  src?: string; // Шлях до SVG-іконки у публічній папці
}

const ArrowIcon: React.FC<ArrowIconProps> = ({
  color,
  width = 24,
  height = 12,
  src = '/icons/arrow-icon.svg', // Шлях за замовчуванням
}) => (
  <img
    src={src}
    alt="Arrow Icon"
    style={{
      width: `${width}px`,
      height: `${height}px`,
      filter: color ? `invert(${color === 'white' ? 1 : 0})` : undefined, // Зміна кольору через фільтр
      marginRight: '8px',
    }}
  />
);

export default ArrowIcon;
