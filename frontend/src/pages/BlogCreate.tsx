import { useState } from "react";
import { BlogContent } from "../components/blog/BlogContent";
import { BlogTitle } from "../components/blog/BlogTitle";
import { Button } from "../components/common/Button";

export const BlogCreate = function () {
  const [isSubmit, setIsSubmit] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleTitleChange(newTitle: string) {
    setTitle(newTitle);
  }

  function handleContentChange(newContent: string) {
    setContent(newContent);
  }

  function handleFormSubmit() {}

  return (
    <div className="mx-auto w-full max-w-screen-lg">
      <div className="flex flex-col gap-10">
        <div className="w-full mt-10 text-xl">
          <BlogTitle value={title} onChange={handleTitleChange} />
        </div>
        <div className="w-full text-xl">
          <BlogContent value={content} onChange={handleContentChange} />
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
