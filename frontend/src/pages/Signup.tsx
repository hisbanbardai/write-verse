import { SignupForm } from "../components/auth/SignupForm";
import { Quote } from "../components/common/Quote";

export const Signup = function () {
  return (
    <div className="h-screen flex ">
      <div className="bg-white flex-1 flex justify-center items-center">
        <SignupForm />
      </div>
      <div className="hidden lg:flex flex-1 justify-center items-center bg-slate-100">
        <Quote />
      </div>
    </div>
  );
};
