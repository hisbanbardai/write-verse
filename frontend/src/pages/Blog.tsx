import { Avatar } from "../components/blog/BlogCard";

export const Blog = function () {
  return (
    <div className="px-20 mt-20 flex gap-8 mb-20">
      <div className="flex flex-col gap-3 w-2/3">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-extrabold">
            Taxing Laughter: The Joke Tax Chronicles
          </h1>
          <p className="text-lg text-slate-500">Posted on August 24, 2023</p>
        </div>
        <div className="text-xl leading-8">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus
          cum error expedita explicabo. Et soluta molestias illo odit a deleniti
          expedita magni beatae modi esse doloremque, ipsam illum dolore
          excepturi? Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Itaque animi, explicabo repellendus enim vitae voluptates ea optio
          reiciendis culpa accusantium libero deleniti! Amet natus quos, nihil
          labore laudantium sequi quasi. Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Temporibus cum error expedita explicabo. Et soluta
          molestias illo odit a deleniti expedita magni beatae modi esse
          doloremque, ipsam illum dolore excepturi? Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Itaque animi, explicabo repellendus enim
          vitae voluptates ea optio reiciendis culpa accusantium libero
          deleniti! Amet natus quos, nihil labore laudantium sequi quasi.
        </div>
      </div>
      <div className="flex flex-col gap-3 w-1/3 ">
        <p className="text-lg font-semibold">Author</p>
        <div className="flex gap-5 items-center">
          <div>
            <Avatar height="8" width="8" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-3xl font-bold">Jokester</p>
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
