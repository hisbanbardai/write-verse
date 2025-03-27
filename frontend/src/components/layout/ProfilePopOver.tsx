import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

export const ProfilePopOver = forwardRef<HTMLDivElement>(function (_, ref) {
  const navigate = useNavigate();

  function handleClick() {
    localStorage.removeItem("token");
    navigate("/signin", { replace: true });
  }

  return (
    <div
      ref={ref}
      className="profile-popover absolute rounded py-4 w-28 bg-gray-300 top-[4.5rem] right-6 flex flex-col gap-3"
    >
      <p className="text-black font-bold text-lg text-center border-b-2 border-gray-400 pb-3">
        My Blogs
      </p>
      <p
        onClick={handleClick}
        className="text-black font-bold text-lg text-center "
      >
        Log out
      </p>
    </div>
  );
});
