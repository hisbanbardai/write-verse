import { BlogCard } from "../components/blog/BlogCard";
import { Skeleton } from "../components/common/Skeleton";
import { PaginationControls } from "../components/blog/PaginationControls";
import { useBlogs } from "../hooks/useBlogs";

export const Blogs = function () {
  const { isLoading, totalNumOfPages, blogs, handlePageChange, currentPage } =
    useBlogs();

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
          blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        )}
      </div>
      {blogs.length > 0 && (
        <PaginationControls
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          totalNumOfPages={totalNumOfPages}
        />
      )}
    </>
  );
};
