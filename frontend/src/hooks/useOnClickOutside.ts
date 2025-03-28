import { RefObject, useEffect } from "react";

type TuseOnClickOutsideProps = (
  refs: RefObject<HTMLDivElement | null>[],
  handlerFunction: () => void
) => void;

export const useOnClickOutside: TuseOnClickOutsideProps = function (
  refs,
  handlerFunction
) {
  useEffect(() => {
    function handleClickEvent(e: MouseEvent) {
      if (refs.every((ref) => !ref.current?.contains(e.target as Node))) {
        handlerFunction();
      }
    }

    document.addEventListener("click", handleClickEvent);

    return () => {
      document.removeEventListener("click", handleClickEvent);
    };
  }, [refs, handlerFunction]);
};
