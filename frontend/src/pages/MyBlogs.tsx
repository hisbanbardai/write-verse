import { useEffect, useState } from "react";
import { Skeleton } from "../components/common/Skeleton";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { BlogCard, TBlog } from "../components/blog/BlogCard";
import { handleError } from "../lib/utils";
import { useNavigate } from "react-router-dom";

export const MyBlogs = function () {
  const [myBlogs, setMyBlogs] = useState<TBlog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserBlogs() {
      try {
        const response = await axios.get(`${BACKEND_URL}/blogs/my-blogs`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setMyBlogs(response.data.blogs.userBlogs);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        handleError(error);
      }
    }
    fetchUserBlogs();
  }, []);

  return (
    <div>
      <h2 className="text-center text-5xl">My Blogs</h2>
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
        ) : myBlogs.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-md mx-auto ">
            <span className="text-4xl">📝</span>
            <h3 className="text-2xl font-medium mt-2">No Blogs Found</h3>
            <p className="text-gray-600 mt-1 text-lg">
              Start writing and share your ideas with the world.
            </p>
            <button
              onClick={() => navigate("/blog/new")}
              className="text-lg mt-4 px-4 py-2 bg-black text-white rounded-lg text"
            >
              Create Blog
            </button>
          </div>
        ) : (
          myBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        )}
      </div>
    </div>
  );
};
