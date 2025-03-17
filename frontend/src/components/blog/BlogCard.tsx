export const BlogCard = function () {
  return (
    <div className="flex flex-col gap-6 border-b border-slate-200 pb-10">
      <div className="flex gap-3 h-full items-center">
        <Avatar />
        <p>Peter V.</p>
        <p className="text-slate-500 font-medium">&middot;</p>
        <p className="text-slate-500 ">Dec 3, 2023</p>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi ullam
          nihil iste quas eos voluptate incidunt porro voluptatem cupiditate
        </h2>
        <p className="text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
          impedit necessitatibus, reiciendis expedita placeat ipsam delectus
          nobis vitae aperiam? In, aut. Perspiciatis repudiandae, rerum
          cupiditate placeat ipsum earum inventore animi...
        </p>
      </div>
      <div>
        <span className="text-slate-500">3 min read</span>
      </div>
    </div>
  );
};

const Avatar = function () {
  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">JL</span>
    </div>
  );
};
