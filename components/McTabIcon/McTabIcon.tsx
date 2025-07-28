import React from 'react';
import McIcon from '@components/McIcon/McIcon';

interface McTabIconProps {
  icon: string;
  color: string;
  size: number;
}

const McTabIcon: React.FC<McTabIconProps> = ({ icon, color, size }) => (
  <McIcon
    source={{uri: icon}}
    resizeMode="contain"
    style={{
      width: size,
      height: size,
      tintColor: color,
    }}
  />
);

export default McTabIcon;

