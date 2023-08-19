import { useId } from 'react';
import './input.scss';

type inputType = 'text' | 'date';

interface IProps {
  type?: inputType;
  value?: string | number;
  name: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function TextInput({ type = 'text', name, onChange, value = '', className }: IProps) {
  const id = useId();

  return (
    <div className={'input-wrapper ' + className}>
      <input id={id} type={type} placeholder={name} onChange={onChange} value={value} />
      <label htmlFor={id}>{name}</label>
    </div>
  );
}
