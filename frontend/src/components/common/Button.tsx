import { ButtonSpinner } from "./ButtonSpinner";

type TButtonProps = {
  label: string;
  handleFormSubmit: () => void;
  isSubmit: boolean;
};

export const Button = function ({
  label,
  handleFormSubmit,
  isSubmit,
}: TButtonProps) {
  return (
    <button
      onClick={handleFormSubmit}
      className="w-full bg-black text-white py-3 text-lg rounded-lg"
      type="button"
      disabled={isSubmit}
    >
      {isSubmit ? <ButtonSpinner /> : label}
    </button>
  );
};
