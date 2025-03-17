import { Avatar } from "../blog/BlogCard";
import { CreateBlogButton } from "./CreateBlogButton";
import { Logo } from "./Logo";

export const AppHeader = function () {
  return (
    <header className="flex justify-between items-center px-10 pt-6 border-b pb-4">
      <Logo />
      <div className="flex gap-10">
        <CreateBlogButton />
        <Avatar width="12" height="12" />
      </div>
    </header>
  );
};
