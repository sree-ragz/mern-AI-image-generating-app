import React from "react";

const FormField = ({
  labelName,
  type,
  name,
  value,
  onChange,
  placeholder,
  onSurpriseMe,
}) => {
  return (
    <div className="flex items-center gap-3 mb-2 my-5 ">
      <label htmlFor={name} className="block text-sm font-medium text-[#222]">
        {labelName}
      </label>
      {onSurpriseMe && (
        <button
          type="button"
          onClick={onSurpriseMe}
          className="font-semibold color-[#222] text-xs bg-[#666] rounded-[5px] px-2 py-2"
        >
          surprise me
        </button>
      )}
      <input
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        name={name}
        required
        className="border border-grey-300 text-sm rounded-lg px-2 py-2 w-[600px] text-[#666]"
      />
    </div>
  );
};

export default FormField;
