import { useEffect, useRef, useState } from "react";
import { Avatar } from "../blog/BlogCard";
import { CreateBlogButton } from "./CreateBlogButton";
import { Logo } from "./Logo";
import { ProfilePopOver } from "./ProfilePopOver";

export const AppHeader = function ({
  authorNameInitials,
}: {
  authorNameInitials: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const profileAvatarRef = useRef<HTMLDivElement>(null);
  const profilePopOverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickEvent(e: MouseEvent) {
      console.log(e.target);

      // if (
      //   e.target instanceof Element &&
      //   !e.target.closest(".profile-avatar") &&
      //   !e.target.closest(".profile-popover")
      // ) {
      //   setIsOpen(false);
      // }

      if (
        !profileAvatarRef.current?.contains(e.target as Node) &&
        !profilePopOverRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    console.log(profileAvatarRef.current);

    document.addEventListener("click", handleClickEvent);

    return () => {
      document.removeEventListener("click", handleClickEvent);
    };
  }, []);

  return (
    <header className="flex justify-between items-center px-10 pt-6 border-b pb-4 relative">
      <Logo />
      <div className="flex gap-10">
        <CreateBlogButton />
        <div
          ref={profileAvatarRef}
          className="cursor-pointer profile-avatar"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Avatar
            authorNameInitials={authorNameInitials}
            width="10"
            height="10"
          />
        </div>
      </div>
      {isOpen && <ProfilePopOver ref={profilePopOverRef} />}
    </header>
  );
};
