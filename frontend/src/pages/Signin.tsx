import { SigninForm } from "../components/auth/SigninForm";
import { Quote } from "../components/common/Quote";

export const Signin = function () {
  return (
    <div className="h-screen flex ">
      <div className="bg-white flex-1 flex justify-center items-center">
        <SigninForm />
      </div>
      <div className="hidden lg:flex flex-1 justify-center items-center bg-slate-100">
        <Quote />
      </div>
    </div>
  );
};
