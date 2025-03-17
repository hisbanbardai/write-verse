import { useEffect, useState } from "react";
import { BlogCard, TBlogCardProps } from "../components/blog/BlogCard";
import axios from "axios";
import { BACKEND_URL } from "../config";

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

  useEffect(() => {
    async function fetchAllBlogs() {
      const response = await axios.get(`${BACKEND_URL}/blogs/bulk`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzfQ.XbLrlArhfDVZA19qVAaMGw0-I9glLBPtlABPchTceiY",
        },
        params: {
          page: 1,
          pageSize: 5,
        },
      });

      setBlogs(response.data.blogs);
    }
    fetchAllBlogs();
  }, []);

  return (
    <div className="lg:max-w-3xl md:max-w-2xl max-w-lg mx-auto mt-20 flex flex-col gap-10">
      {blogs.map((blog) => (
        <BlogCard
          title={blog.title}
          content={blog.content}
          firstName={blog.author.firstName}
          lastName={blog.author.lastName}
          createdAt={blog.createdAt}
        />
      ))}
    </div>
  );
};
