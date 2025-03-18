import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const handleError = function (error: unknown) {
  let message;

  if (error instanceof AxiosError) {
    message = error.response?.data.message;
  } else if (error instanceof Error) {
    message = error.message;
  } else {
    message = "An unknown error occurred";
  }

  toast.error(message);
};
