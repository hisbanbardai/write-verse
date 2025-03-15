import { useNavigate } from "react-router-dom";
import { Button } from "../common/Button";
import { InputBox } from "../common/InputBox";
import { useState } from "react";
import { signinSchema, signinSchemaT } from "@hisbanshiraz/common";
import axios, { AxiosError } from "axios";
import { AuthHeader } from "../common/AuthHeader";

export const SigninForm = function () {
  const [signinFormData, setSigninFormData] = useState<signinSchemaT>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setErrors({});
    setSigninFormData({ ...signinFormData, [e.target.name]: e.target.value });
  }

  function checkFormValidation() {
    const result = signinSchema.safeParse(signinFormData);
    console.log(result);

    if (!result.success) {
      const errorsObj: Record<string, string[]> =
        result.error.formErrors.fieldErrors;
      const validationErrors: Record<string, string> = {};

      console.log(errorsObj);

      for (const key of Object.keys(errorsObj)) {
        validationErrors[`${key}`] = errorsObj[key][0];
      }

      setErrors(validationErrors);

      return true;
    }

    return false;
  }

  async function handleFormSubmit() {
    try {
      if (!checkFormValidation()) {
        const response = await axios.post(
          "https://write-verse.hisbanbardai.workers.dev/api/v1/users/signin",
          signinFormData
        );

        //set token in local storage
        localStorage.setItem("token", response.data.token);

        //navigate user to blogs page
        navigate("/blogs");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrors(error.response?.data);
        console.error(error.response?.data.message);
      } else {
        console.error(error);
      }
    }
  }

  return (
    <div className="flex flex-col gap-8 max-w-sm w-full">
      <AuthHeader
        headingText={"Login"}
        subHeadingText={"Don't have an account?"}
        linkText={"Sign up"}
        to={"/signup"}
      />
      <form className="flex flex-col gap-4">
        <InputBox
          label={"Username"}
          placeholder={"johndoe@example.com"}
          type="email"
          value={signinFormData.username}
          name="username"
          handleChange={handleChange}
        />
        {errors.username && (
          <span className="text-red-500 text-lg font-semibold">
            {errors.username}
          </span>
        )}
        <InputBox
          label={"Password"}
          placeholder={"123456"}
          type="password"
          value={signinFormData.password}
          name="password"
          handleChange={handleChange}
        />
        {errors.password && (
          <span className="text-red-500 text-lg font-semibold">
            {errors.password}
          </span>
        )}
        <Button handleFormSubmit={handleFormSubmit} label={"Sign in"} />
        {errors.message && (
          <span className="text-red-500 text-lg font-semibold">
            {errors.message}
          </span>
        )}
      </form>
    </div>
  );
};
