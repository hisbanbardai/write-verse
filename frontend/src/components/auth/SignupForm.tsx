import { Link } from "react-router-dom";
import { Button } from "../common/Button";
import { InputBox } from "../common/InputBox";

export const SignupForm = function () {
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
        <InputBox label={"Name"} placeholder={"John Doe"} />
        <InputBox label={"Username"} placeholder={"johndoe@example.com"} />
        <InputBox label={"Password"} placeholder={"123456"} />
        <Button label={"Sign Up"} />
      </form>
    </div>
  );
};
