import { BlogContent } from "../components/blog/BlogContent";
import { BlogTitle } from "../components/blog/BlogTitle";

export const BlogCreate = function () {
  return (
    <div className="flex flex-col items-center w-full gap-10">
      <div className="max-w-screen-lg w-full mt-10 text-xl">
        <BlogTitle />
      </div>
      <div className="max-w-screen-lg w-full text-xl">
        <BlogContent />
      </div>
    </div>
  );
};
