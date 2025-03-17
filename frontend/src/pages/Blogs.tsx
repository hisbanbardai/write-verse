import { useEffect, useState } from "react";
import { BlogCard, TBlogCardProps } from "../components/blog/BlogCard";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Skeleton } from "../components/common/Skeleton";

type TBlogAuthor = {
  firstName: string;
  lastName: string;
};

type TBlog = TBlogCardProps & {
  id: string;
  author: TBlogAuthor;
};

export const Blogs = function () {
  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchAllBlogs() {
      setIsLoading(true);
      const response = await axios.get(`${BACKEND_URL}/blogs/bulk`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          page: 1,
          pageSize: 5,
        },
      });

      setBlogs(response.data.blogs);
      setIsLoading(false);
    }
    fetchAllBlogs();
  }, []);

  return (
    <div className="lg:max-w-3xl md:max-w-2xl max-w-lg mx-auto mt-20 flex flex-col gap-10">
      {isLoading ? (
        <>
          <Skeleton />
          <br />
          <Skeleton />
          <br />
          <Skeleton />
          <br />
          <Skeleton />
          <br />
          <Skeleton />
        </>
      ) : (
        blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            title={blog.title}
            content={blog.content}
            firstName={blog.author.firstName}
            lastName={blog.author.lastName}
            createdAt={blog.createdAt}
          />
        ))
      )}
    </div>
  );
};
