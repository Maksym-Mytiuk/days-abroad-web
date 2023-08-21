import { useId } from 'react';
import './input.scss';

type inputType = 'text' | 'date';

interface IProps {
  type?: inputType;
  value?: string | number;
  name: string;
  label?: string;
  className?: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export default function TextInput({ type = 'text', name, label = name, value = '', className, onChange }: IProps) {
  const id = useId();

  return (
    <div className={'input-wrapper ' + className}>
      <input id={id} type={type} placeholder={label} name={name} value={value} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
