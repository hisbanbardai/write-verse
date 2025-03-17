import { Button } from "../common/Button";
import { InputBox } from "../common/InputBox";
import { signupSchema } from "@hisbanshiraz/common";
import { AuthHeader } from "../common/AuthHeader";
import { useAuthForm } from "../../hooks/useAuthForm";
import { BACKEND_URL } from "../../config";

export const SignupForm = function () {
  const { formData, errors, handleChange, handleFormSubmit, isSubmit } =
    useAuthForm(
      signupSchema,
      { username: "", password: "" },
      `${BACKEND_URL}/users/signup`
    );

  return (
    <div className="flex flex-col gap-8 max-w-sm w-full ">
      <AuthHeader
        headingText={"Create Account"}
        subHeadingText={"Already have an account?"}
        linkText={"Login"}
        to={"/signin"}
      />
      <form className="flex flex-col gap-4">
        <InputBox
          label={"First Name"}
          placeholder={"John"}
          value={"firstName" in formData ? formData.firstName : ""}
          name="firstName"
          handleChange={handleChange}
        />
        {errors.firstName && (
          <span className="text-red-500 text-lg font-semibold">
            {errors.firstName}
          </span>
        )}
        <InputBox
          label={"Last Name"}
          placeholder={"Doe"}
          value={"lastName" in formData ? formData.lastName : ""}
          name="lastName"
          handleChange={handleChange}
        />
        {errors.lastName && (
          <span className="text-red-500 text-lg font-semibold">
            {errors.lastName}
          </span>
        )}
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
          label={"Sign Up"}
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
