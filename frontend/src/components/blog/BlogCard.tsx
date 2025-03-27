import { Link } from "react-router-dom";
import { TBlogAuthor } from "../../hooks/useBlogs";

export type TBlog = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  author: TBlogAuthor;
};

type TBlogCardProps = {
  blog: TBlog;
};

const stripHtml = (html: string) => {
  return html.replace(/<\/?[^>]+(>|$)/g, ""); // Removes all HTML tags
};

export const BlogCard = function ({ blog }: TBlogCardProps) {
  const formattedDate = new Date(Date.parse(blog.createdAt)).toDateString();
  const slicedContent = stripHtml(blog.content).slice(
    0,
    blog.content.length / 2
  );
  const readDuration = Math.ceil(blog.content.length / 100);
  const authorNameInitials =
    blog.author.firstName[0].toUpperCase() +
    blog.author.lastName[0].toUpperCase();

  return (
    <Link to={`/blog/${blog.id}`}>
      <div className="flex flex-col gap-6 border-b border-slate-200 pb-10">
        <div className="flex gap-3 h-full items-center">
          <Avatar
            width="10"
            height="10"
            authorNameInitials={authorNameInitials}
          />
          <p>
            {blog.author.firstName} {blog.author.lastName}
          </p>
          <p className="text-slate-500 font-medium">&middot;</p>
          <p className="text-slate-500 ">{formattedDate}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">{stripHtml(blog.title)}</h2>
          <p className="text-lg">{slicedContent}...</p>
        </div>
        <div>
          <span className="text-slate-500">{readDuration} min read</span>
        </div>
      </div>
    </Link>
  );
};

export const Avatar = function ({
  width,
  height,
  authorNameInitials,
}: {
  width: string;
  height: string;
  authorNameInitials: string;
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center w-${width} h-${height} overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600`}
    >
      <span className="font-medium text-gray-600 dark:text-gray-300 text-lg">
        {authorNameInitials}
      </span>
    </div>
  );
};
