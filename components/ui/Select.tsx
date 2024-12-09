"use client";

import { useState } from "react";

interface SelectProps {
  name: string;
  options: string[];
}

const Select = ({ name, options }: SelectProps) => {
  const [value, setValue] = useState<string>(name);

  return (
    <select
      value={value}
      className="text-davys-grey shadow-select bg-white select select-bordered w-full max-w-xs"
      onChange={(e) => setValue(e.target.value)}
    >
      <option disabled>{name}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
