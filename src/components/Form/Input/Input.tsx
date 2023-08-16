import { useId } from 'react';
import './input.scss';

type inputType = 'text' | 'date';

interface IProps {
  type?: inputType;
  value?: string | number;
  name: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export default function TextInput({ type = 'text', name, onChange, value = '' }: IProps) {
  const id = useId();

  return (
    <div className="input-wrapper">
      <input id={id} type={type} placeholder={name} onChange={onChange} value={value} />
      <label htmlFor={id}>{name}</label>
    </div>
  );
}
