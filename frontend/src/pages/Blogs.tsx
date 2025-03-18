import { useEffect, useState } from "react";
import { BlogCard, TBlogCardProps } from "../components/blog/BlogCard";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Skeleton } from "../components/common/Skeleton";
import { PaginationControls } from "../components/blog/PaginationControls";

type TBlogAuthor = {
  firstName: string;
  lastName: string;
};

type TBlog = TBlogCardProps & {
  id: string;
  author: TBlogAuthor;
};

let totalNumOfPages = 1;

export const Blogs = function () {
  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  function handlePageChange(direction: string) {
    if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }

    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    }
  }

  useEffect(() => {
    async function fetchAllBlogs() {
      setIsLoading(true);
      const response = await axios.get(`${BACKEND_URL}/blogs/bulk`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          page: currentPage,
          pageSize: 5,
        },
      });

      setBlogs(response.data.blogs);
      setIsLoading(false);
      totalNumOfPages = response.data.totalPages;
      console.log(totalNumOfPages);
    }
    fetchAllBlogs();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  return (
    <>
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
      <PaginationControls
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalNumOfPages={totalNumOfPages}
      />
    </>
  );
};
