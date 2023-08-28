import { useId } from 'react';

interface IProps {
  name: string;
  value?: string;
  defaultValue: string;
  options: { key: string; value: string }[];
  className?: string;
  label?: string;
  required?: boolean;
  onChange: (e: React.FormEvent<HTMLSelectElement>) => void;
}

export default function Select(props: IProps) {
  const id = useId();
  const { name, value, defaultValue, label = name, className, options, required = true, onChange } = props;

  return (
    <div className={'input-wrapper ' + className}>
      <select id={id} value={value} name={name} onChange={onChange} required={required}>
        <option value="">{defaultValue}</option>
        {options.map((item, index) => {
          return (
            <option value={item.key} key={index}>
              {item.value}
            </option>
          );
        })}
      </select>
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
