import { ReactNode } from 'react';
import './button.scss';

export default function index({ children }: { children: ReactNode }) {
  return <button>{children}</button>;
}
