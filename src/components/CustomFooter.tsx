import React from 'react';
import { Button } from '@mui/material';

interface ButtonInfo {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

interface FooterProps {
  buttons: ButtonInfo[];
}

const CustomFooter: React.FC<FooterProps> = ({ buttons }) => {
  return (
    <footer style={footerStyle}>
      {buttons.map((button, index) => (
        <Button
          key={index}
          variant="text"
          startIcon={button.icon}
          style={buttonStyle}
          onClick={button.onClick}
          size={button.size || 'medium'}
        >
          {button.label}
        </Button>
      ))}
    </footer>
  );
};

const footerStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'space-around',
  padding: '10px',
  backgroundColor: '#f0f0f0',
  borderTop: '1px solid #ddd',
};

const buttonStyle: React.CSSProperties = {
  minWidth: '100px',
};

export default CustomFooter;
