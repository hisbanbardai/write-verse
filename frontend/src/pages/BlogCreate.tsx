import { useState } from "react";
import { BlogContent } from "../components/blog/BlogContent";
import { BlogTitle } from "../components/blog/BlogTitle";
import { Button } from "../components/common/Button";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { handleError } from "../lib/utils";
import { useNavigate } from "react-router-dom";

export const BlogCreate = function () {
  const [isSubmit, setIsSubmit] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  function handleTitleChange(newTitle: string) {
    setTitle(newTitle);
  }

  function handleContentChange(newContent: string) {
    setContent(newContent);
  }

  async function handleFormSubmit() {
    try {
      setIsSubmit(true);

      const response = await axios.post(
        `${BACKEND_URL}/blogs`,
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
      setIsSubmit(false);
      setTitle("");
      setContent("");

      navigate(`/blog/${response.data.createdBlog.id}`);
    } catch (error) {
      setIsSubmit(false);
      console.error(error);
      handleError(error);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[400px] sm:max-w-screen-sm lg:max-w-screen-lg ">
      <div className="flex flex-col gap-10">
        <div className="w-full mt-10 text-xl">
          <BlogTitle value={title} onChange={handleTitleChange} />
        </div>
        <div className="w-full text-xl">
          <BlogContent value={content} onChange={handleContentChange} />
        </div>
      </div>
      <div className="w-2/6 lg:w-1/6 mt-6">
        <Button
          handleFormSubmit={handleFormSubmit}
          label="Publish"
          isSubmit={isSubmit}
        />
      </div>
    </div>
  );
};
