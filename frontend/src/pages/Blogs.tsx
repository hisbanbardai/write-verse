import { BlogCard } from "../components/blog/BlogCard";

export const Blogs = function () {
  return (
    <div className="lg:max-w-3xl md:max-w-2xl max-w-lg mx-auto mt-20 flex flex-col gap-10">
      <BlogCard />
      <BlogCard />
      <BlogCard />
    </div>
  );
};
