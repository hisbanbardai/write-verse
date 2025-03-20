import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { TBlog } from "../components/blog/BlogCard";
import { useQuery } from "@tanstack/react-query";

export type TBlogAuthor = {
  firstName: string;
  lastName: string;
};

type TBlogResponse = {
  blogs: TBlog[];
  totalPages: number;
};

export const useBlogs = function () {
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
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  async function fetchAllBlogs(): Promise<TBlogResponse> {
    const response = await axios.get(`${BACKEND_URL}/blogs/bulk`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params: {
        page: currentPage,
        pageSize: 5,
      },
    });

    return response.data;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["page-number", currentPage],
    queryFn: () => fetchAllBlogs(),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const blogs = data?.blogs || [];
  const totalNumOfPages = data?.totalPages || 1;

  return {
    isLoading,
    blogs,
    currentPage,
    handlePageChange,
    totalNumOfPages,
  };
};
