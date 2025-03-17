import { Link } from "react-router-dom";

export const Logo = function () {
  return (
    <div className="text-4xl font-bold">
      <Link to={"/"}>WriteVerse</Link>
    </div>
  );
};
