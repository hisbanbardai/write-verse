import { signinSchemaT, signupSchemaT } from "@hisbanshiraz/common";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ZodSchema } from "zod";

export const useAuthForm = function (
  schema: ZodSchema,
  initialData: signinSchemaT | signupSchemaT,
  apiUrl: string
) {
  const [formData, setFormData] = useState(initialData);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setErrors({});
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function hasValidationErrors() {
    const result = schema.safeParse(formData);

    if (!result.success) {
      const errorsObj = result.error.formErrors.fieldErrors;
      const validationErrors: Record<string, string> = {};

      for (const key of Object.keys(errorsObj)) {
        if (errorsObj[key]) {
          validationErrors[`${key}`] = errorsObj[key][0];
        }
      }

      setErrors(validationErrors);

      return true;
    }

    return false;
  }

  async function handleFormSubmit() {
    try {
      if (!hasValidationErrors()) {
        const response = await axios.post(apiUrl, formData);

        //set token in local storage
        localStorage.setItem("token", response.data.token);

        //navigate user to blogs page
        navigate("/blogs");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data.message);
        setErrors(error.response?.data);
      } else {
        console.error(error);
        setErrors({ message: "An unexpected error occurred." });
      }
    }
  }

  return {
    formData,
    errors,
    handleChange,
    handleFormSubmit,
  };
};
