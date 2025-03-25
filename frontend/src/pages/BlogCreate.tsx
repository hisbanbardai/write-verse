import { BlogTitle } from "../components/blog/BlogTitle";

export const BlogCreate = function () {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="max-w-screen-lg w-full mt-20 text-xl">
        <BlogTitle />
      </div>
    </div>
  );
};
