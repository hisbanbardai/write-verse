export type TBlogCardProps = {
  title: string;
  content: string;
  firstName: string;
  lastName: string;
  createdAt: string;
};

export const BlogCard = function ({
  title,
  content,
  firstName,
  lastName,
  createdAt,
}: TBlogCardProps) {
  const formattedDate = new Date(Date.parse(createdAt)).toDateString();
  const slicedContent = content.slice(0, content.length / 2);
  const readDuration = Math.ceil(content.length / 100);
  const authorNameInitials =
    firstName[0].toUpperCase() + lastName[0].toUpperCase();

  return (
    <div className="flex flex-col gap-6 border-b border-slate-200 pb-10">
      <div className="flex gap-3 h-full items-center">
        <Avatar
          width="10"
          height="10"
          authorNameInitials={authorNameInitials}
        />
        <p>
          {firstName} {lastName}
        </p>
        <p className="text-slate-500 font-medium">&middot;</p>
        <p className="text-slate-500 ">{formattedDate}</p>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-lg">{slicedContent}...</p>
      </div>
      <div>
        <span className="text-slate-500">{readDuration} min read</span>
      </div>
    </div>
  );
};

export const Avatar = function ({
  width = "10",
  height = "10",
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
