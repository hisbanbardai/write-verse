import { forwardRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

export const ProfilePopOver = forwardRef<HTMLDivElement>(function (_, ref) {
  const navigate = useNavigate();

  function handleLogoutClick() {
    localStorage.removeItem("token");
    navigate("/signin", { replace: true });
  }

  function handleMyBlogsClick() {
    navigate("/my-blogs");
  }

  return createPortal(
    <div
      ref={ref}
      className="profile-popover absolute rounded py-4 w-28 bg-gray-300 top-[4.5rem] right-6 flex flex-col gap-3"
    >
      <p
        onClick={handleMyBlogsClick}
        className="text-black font-bold text-lg text-center border-b-2 border-gray-400 pb-3"
      >
        My Blogs
      </p>
      <p
        onClick={handleLogoutClick}
        className="text-black font-bold text-lg text-center "
      >
        Log out
      </p>
    </div>,
    document.body
  );
});
