import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function useBlog(id: string | undefined) {
  const isIdValid = id && !isNaN(Number(id));

  async function fetchBlog() {
    const response = await axios.get(`${BACKEND_URL}/blogs/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["blogId", id],
    queryFn: fetchBlog,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(isIdValid),
  });

  const blog = data?.existingBlog || null;

  return { blog, isLoading, refetch };
}
