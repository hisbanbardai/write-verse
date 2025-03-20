import { useParams } from "react-router-dom";
import { BlogDetail } from "../components/blog/BlogDetail";
import { useBlog } from "../hooks/useBlog";
import { Loader } from "../components/common/Loader";

export const Blog = function () {
  const { id } = useParams();
  const { blog, isLoading } = useBlog(id);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-3xl font-bold">
          Invalid blog ID or blog not found.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <BlogDetail blog={blog} />
    </div>
  );
};
