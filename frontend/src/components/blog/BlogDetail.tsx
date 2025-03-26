import { Avatar, TBlog } from "./BlogCard";

export const BlogDetail = function ({ blog }: { blog: TBlog }) {
  return (
    <div className="px-10 mt-20 flex gap-8 mb-20 lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
      <div className="flex flex-col gap-3 w-2/3">
        <div className="flex flex-col gap-2">
          <h1
            className="text-5xl font-extrabold"
            dangerouslySetInnerHTML={{ __html: blog.title }}
          ></h1>
          <p className="text-lg text-slate-500">
            Posted on {new Date(Date.parse(blog.createdAt)).toDateString()}
          </p>
        </div>
        <div
          className="text-xl leading-8"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>
      </div>
      <div className="flex flex-col gap-3 w-1/3 ">
        <p className="text-lg font-semibold">Author</p>
        <div className="flex gap-5 items-center">
          <div>
            <Avatar
              authorNameInitials={`${blog.author.firstName[0].toUpperCase()}${blog.author.lastName[0].toUpperCase()}`}
              height="8"
              width="8"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-3xl font-bold">{blog.author.firstName}</p>
            <p className="text-xl text-slate-500">
              Master of mirth, purveyor of puns and the funniest person in the
              kingdom
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
