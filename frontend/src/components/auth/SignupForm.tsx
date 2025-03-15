import { Link, useNavigate } from "react-router-dom";
import { Button } from "../common/Button";
import { InputBox } from "../common/InputBox";
import { useState } from "react";
import { signupSchema, signupSchemaT } from "@hisbanshiraz/common";
import axios, { AxiosError } from "axios";

export const SignupForm = function () {
  const [signupFormData, setSignupFormData] = useState<signupSchemaT>({
    name: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setErrors({});
    setSignupFormData({ ...signupFormData, [e.target.name]: e.target.value });
  }

  function checkFormValidation() {
    const result = signupSchema.safeParse(signupFormData);

    if (!result.success) {
      const errorsObj: Record<string, string[]> =
        result.error.formErrors.fieldErrors;
      const validationErrors: Record<string, string> = {};

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
          "https://write-verse.hisbanbardai.workers.dev/api/v1/users/signup",
          signupFormData
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
      <div className="text-center flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Create an account</h1>
        <p className="text-xl text-slate-500">
          Already have an account?{" "}
          <Link to={"/signin"} className="underline">
            Login
          </Link>
        </p>
      </div>
      <form className="flex flex-col gap-4">
        <InputBox
          label={"Name"}
          placeholder={"John Doe"}
          required={false}
          value={signupFormData.name}
          name="name"
          handleChange={handleChange}
        />

        <InputBox
          label={"Username"}
          placeholder={"johndoe@example.com"}
          type="email"
          value={signupFormData.username}
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
          value={signupFormData.password}
          name="password"
          handleChange={handleChange}
        />
        {errors.password && (
          <span className="text-red-500 text-lg font-semibold">
            {errors.password}
          </span>
        )}
        <Button handleFormSubmit={handleFormSubmit} label={"Sign Up"} />
        {errors.message && (
          <span className="text-red-500 text-lg font-semibold">
            {errors.message}
          </span>
        )}
      </form>
    </div>
  );
};
