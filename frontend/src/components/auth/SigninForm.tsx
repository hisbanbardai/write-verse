import { Button } from "../common/Button";
import { InputBox } from "../common/InputBox";
import { signinSchema } from "@hisbanshiraz/common";
import { AuthHeader } from "../common/AuthHeader";
import { useAuthForm } from "../../hooks/useAuthForm";
import { BACKEND_URL } from "../../config";

export const SigninForm = function () {
  const { formData, errors, handleChange, handleFormSubmit, isSubmit } =
    useAuthForm(
      signinSchema,
      { username: "", password: "" },
      `${BACKEND_URL}/users/signin`
    );

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
          value={formData.username}
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
          value={formData.password}
          name="password"
          handleChange={handleChange}
        />
        {errors.password && (
          <span className="text-red-500 text-lg font-semibold">
            {errors.password}
          </span>
        )}
        <Button
          handleFormSubmit={handleFormSubmit}
          label={"Sign in"}
          isSubmit={isSubmit}
        />
        {errors.message && (
          <span className="text-red-500 text-lg font-semibold">
            {errors.message}
          </span>
        )}
      </form>
    </div>
  );
};
