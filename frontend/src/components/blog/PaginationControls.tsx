import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

export const PaginationControls = function () {
  return (
    <div className="flex justify-center mt-14 mb-10 gap-8  items-center">
      <PaginationButton direction={"previous"} size={16} />
      <p>Page 1</p>
      <PaginationButton direction={"next"} size={16} />
    </div>
  );
};

type TPaginationProps = {
  direction: string;
  size: number;
};

const PaginationButton = function ({ direction, size }: TPaginationProps) {
  return (
    <button className="bg-slate-200 p-3 rounded-full hover:bg-slate-300">
      {direction === "previous" && <ArrowLeftIcon width={size} height={size} />}

      {direction === "next" && <ArrowRightIcon width={size} height={size} />}
    </button>
  );
};
