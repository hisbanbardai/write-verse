import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type TPaginationControlsProps = {
  currentPage: number;
  handlePageChange: (direction: string) => void;
  totalNumOfPages: number;
};

export const PaginationControls = function ({
  currentPage,
  handlePageChange,
  totalNumOfPages,
}: TPaginationControlsProps) {
  return (
    <div className="flex justify-center mt-14 mb-10 gap-8  items-center">
      {currentPage > 1 && (
        <PaginationButton
          handlePageChange={handlePageChange}
          direction={"previous"}
          size={16}
        />
      )}
      <p>Page {currentPage}</p>
      {currentPage < totalNumOfPages && (
        <PaginationButton
          handlePageChange={handlePageChange}
          direction={"next"}
          size={16}
        />
      )}
    </div>
  );
};

type TPaginationProps = {
  direction: string;
  size: number;
  handlePageChange: (direction: string) => void;
};

const PaginationButton = function ({
  direction,
  size,
  handlePageChange,
}: TPaginationProps) {
  return (
    <button
      onClick={() => handlePageChange(`${direction}`)}
      className="bg-slate-200 p-3 rounded-full hover:bg-slate-300"
    >
      {direction === "previous" && <ArrowLeftIcon width={size} height={size} />}

      {direction === "next" && <ArrowRightIcon width={size} height={size} />}
    </button>
  );
};
