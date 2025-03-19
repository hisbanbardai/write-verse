import { SignupForm } from "../components/auth/SignupForm";
import { Quote } from "../components/common/Quote";

export const Signup = function () {
  return (
    <div className="h-screen flex ">
      <div className="bg-white flex-1 flex justify-center overflow-y-scroll  mt-16 mb-2">
        <SignupForm />
      </div>
      <div className="hidden lg:flex flex-1 bg-slate-100 items-center justify-center">
        <Quote />
      </div>
    </div>
  );
};
