import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import { Loader } from "../components/common/Loader";
import { useEffect, useState } from "react";
import { handleError } from "../lib/utils";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { BlogTitle } from "../components/blog/BlogTitle";
import { BlogContent } from "../components/blog/BlogContent";
import { Button } from "../components/common/Button";

export const BlogEdit = function () {
  const { id } = useParams();
  const { blog, isLoading, refetch } = useBlog(id);
  const [isSubmit, setIsSubmit] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
    }
  }, [blog]);

  function handleTitleChange(newTitle: string) {
    setTitle(newTitle);
  }

  function handleContentChange(newContent: string) {
    setContent(newContent);
  }

  async function handleFormSubmit() {
    try {
      setIsSubmit(true);

      const response = await axios.put(
        `${BACKEND_URL}/blogs/${blog.id}`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTitle("");
      setContent("");

      await refetch();
      setIsSubmit(false);
      navigate(`/blog/${response.data.updatedBlog?.id}`, { replace: true });
    } catch (error) {
      setIsSubmit(false);
      console.error(error);
      handleError(error);
    }
  }

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
    <div className="mx-auto w-full max-w-screen-lg">
      <div className="flex flex-col gap-10">
        <div className="w-full mt-10 text-xl">
          <BlogTitle value={blog.title} onChange={handleTitleChange} />
        </div>
        <div className="w-full text-xl">
          <BlogContent value={blog.content} onChange={handleContentChange} />
        </div>
      </div>
      <div className="w-1/6 mt-6">
        <Button
          handleFormSubmit={handleFormSubmit}
          label="Publish"
          isSubmit={isSubmit}
        />
      </div>
    </div>
  );
};
