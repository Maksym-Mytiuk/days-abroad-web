import { useId } from 'react';
import './input.scss';

type inputType = 'text' | 'date' | 'checkbox';

interface IProps {
  type?: inputType;
  value?: string | number;
  checked?: boolean;
  name: string;
  label?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export default function Input(props: IProps) {
  const id = useId();
  const {
    type = 'text',
    name,
    label = name,
    value = '',
    checked = false,
    className = '',
    required = true,
    disabled = false,
    onChange,
  } = props;

  return (
    <div className={'input-wrapper ' + className}>
      {type === 'checkbox' ? (
        <input
          required={required}
          id={id}
          type={type}
          placeholder={label}
          name={name}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
        />
      ) : (
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
      )}
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
