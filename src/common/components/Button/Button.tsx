import { ReactNode } from 'react';
import './button.scss';

interface IProps {
  children: ReactNode;
  className?: 'outline' | '';
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({ children, className = '', type = 'button', disabled, onClick }: IProps) {
  return (
    <button className={`btn ${className}`} type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
