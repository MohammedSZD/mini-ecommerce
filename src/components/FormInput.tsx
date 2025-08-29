import React from "react";
import ErrorMessage from "./ErrorMessage";

type InputProps = {
  label: string;
  name: string;
  type?: "text" | "number";
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  step?: string;
  min?: number;
};

const FormInput: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  step,
  min,
}) => {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm text-gray-600">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        step={step}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-md border px-3 py-2 outline-none focus:border-blue-500 ${
          error ? "border-red-400" : "border-gray-300"
        }`}
      />

      {error ? <ErrorMessage message={error} /> : null}
    </div>
  );
};

export default FormInput;
