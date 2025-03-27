import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const handleError = function (error: unknown) {
  let message;

  if (error instanceof AxiosError) {
    message = error.response?.data.message;

    if (typeof message !== "string") {
      for (const key of Object.keys(message)) {
        toast.error(message[key][0]);
      }
      return;
    }
  } else if (error instanceof Error) {
    message = error.message;
  } else {
    message = "An unknown error occurred";
  }

  toast.error(message);
};
