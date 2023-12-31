import { ReactNode } from 'react';
import './button.scss';

interface IProps {
  children: ReactNode;
  className?: 'outline' | '';
  onClick?: () => void;
}

export default function index({ children, className = '', onClick }: IProps) {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
