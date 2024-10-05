import React from 'react';
import './Avatar.css';

const Avatar = ({ name, size = 40, backgroundColor, color }) => {
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  const generateColor = (name) => {
    if (!name) return '#000000';
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return '#' + '00000'.substring(0, 6 - c.length) + c;
  };

  const initials = getInitials(name);
  const bgColor = backgroundColor || generateColor(name);
  const textColor = color || '#FFFFFF';

  const style = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: bgColor,
    color: textColor,
    fontSize: `${size * 0.4}px`,
  };

  return (
    <div className="avatar" style={style} title={name || 'Unknown'}>
      <span className="avatar-initials">{initials}</span>
    </div>
  );
};

export default Avatar;
