type TButtonProps = {
  label: string;
  handleFormSubmit: () => void;
};

export const Button = function ({ label, handleFormSubmit }: TButtonProps) {
  return (
    <button
      onClick={handleFormSubmit}
      className="w-full bg-black text-white py-3 text-lg rounded-lg"
      type="button"
    >
      {label}
    </button>
  );
};
