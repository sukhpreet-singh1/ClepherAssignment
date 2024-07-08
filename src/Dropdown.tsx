import React, { useState } from "react";

type Option = {
  value: string;
  label: string;
};

interface DropdownProps {
  options: Option[];
  onChange: (selectedValue: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onChange }) => {
  const [selectedValue, setSelectedValue] = useState<string>(options[0].value);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className="flex flex-row font-lexend h-12 items-center justify-center">
      <p className="mr-10">Please choose the value from dropdown</p>
      <select
        className="w-2/12 h-8 "
        value={selectedValue}
        onChange={handleChange}
      >
        {options.map((option) => (
          <option className="" key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
