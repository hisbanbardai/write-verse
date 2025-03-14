export const InputBox = function ({ label, placeholder }) {
  return (
    <div className="flex flex-col gap-4">
      <label className="text-black font-semibold ">{label}</label>
      <input
        className="p-3 border-2 rounded-md"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};
