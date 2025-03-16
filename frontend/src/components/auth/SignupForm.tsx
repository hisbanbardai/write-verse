import { Button } from "../common/Button";
import { InputBox } from "../common/InputBox";
import { signupSchema } from "@hisbanshiraz/common";
import { AuthHeader } from "../common/AuthHeader";
import { useAuthForm } from "../../hooks/useAuthForm";
import { SIGNUP_API_URL } from "../../config";

export const SignupForm = function () {
  const { formData, errors, handleChange, handleFormSubmit } = useAuthForm(
    signupSchema,
    { username: "", password: "" },
    SIGNUP_API_URL
  );

  return (
    <div className="flex flex-col gap-8 max-w-sm w-full">
      <AuthHeader
        headingText={"Create Account"}
        subHeadingText={"Already have an account?"}
        linkText={"Login"}
        to={"/signin"}
      />
      <form className="flex flex-col gap-4">
        <InputBox
          label={"Name"}
          placeholder={"John Doe"}
          required={false}
          value={"name" in formData ? formData.name : ""}
          name="name"
          handleChange={handleChange}
        />

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
