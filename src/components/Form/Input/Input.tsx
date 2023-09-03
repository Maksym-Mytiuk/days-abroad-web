import { useId } from 'react';
import './input.scss';

type inputType = 'text' | 'date';

interface IProps {
  type?: inputType;
  value?: string | number;
  name: string;
  label?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export default function TextInput(props: IProps) {
  const id = useId();
  const {
    type = 'text',
    name,
    label = name,
    value = '',
    className,
    required = true,
    disabled = false,
    onChange,
  } = props;

  return (
    <div className={'input-wrapper ' + className}>
      <input
        required={required}
        id={id}
        type={type}
        placeholder={label}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
