import { useRef, useState } from "react";
import { Avatar } from "../blog/BlogCard";
import { CreateBlogButton } from "./CreateBlogButton";
import { Logo } from "./Logo";
import { ProfilePopOver } from "./ProfilePopOver";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

export const AppHeader = function ({
  authorNameInitials,
}: {
  authorNameInitials: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const profileAvatarRef = useRef<HTMLDivElement>(null);
  const profilePopOverRef = useRef<HTMLDivElement>(null);

  useOnClickOutside([profileAvatarRef], () => setIsOpen(false));

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
