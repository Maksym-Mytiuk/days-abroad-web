import { ReactNode } from 'react';
import './button.scss';

interface IProps {
  children: ReactNode;
  className?: 'outline' | '';
}

export default function index({ children, className = '' }: IProps) {
  return <button className={className + ' btn'}>{children}</button>;
}
