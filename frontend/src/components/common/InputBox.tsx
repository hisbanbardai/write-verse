type TInputBox = {
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  value: string | undefined;
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputBox = function ({
  label,
  placeholder,
  type = "text",
  required = true,
  value,
  name,
  handleChange,
}: TInputBox) {
  return (
    <div className="flex flex-col gap-4">
      <label className="text-black font-semibold ">{label}</label>
      <input
        className="p-3 border-2 rounded-md"
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        name={name}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};
