import { Avatar } from "../blog/BlogCard";
import { CreateBlogButton } from "./CreateBlogButton";
import { Logo } from "./Logo";

export const AppHeader = function ({
  authorNameInitials,
}: {
  authorNameInitials: string;
}) {
  return (
    <header className="flex justify-between items-center px-10 pt-6 border-b pb-4">
      <Logo />
      <div className="flex gap-10">
        <CreateBlogButton />
        <Avatar
          authorNameInitials={authorNameInitials}
          width="10"
          height="10"
        />
      </div>
    </header>
  );
};
