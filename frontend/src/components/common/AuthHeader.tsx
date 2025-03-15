import { Link } from "react-router-dom";

type TAuthHeaderProps = {
  headingText: string;
  subHeadingText: string;
  to: string;
  linkText: string;
};

export const AuthHeader = function ({
  headingText,
  subHeadingText,
  to,
  linkText,
}: TAuthHeaderProps) {
  return (
    <div className="text-center flex flex-col gap-4">
      <h1 className="text-4xl font-bold">{headingText}</h1>
      <p className="text-xl text-slate-500">
        {subHeadingText}
        <Link to={to} className="underline">
          {linkText}
        </Link>
      </p>
    </div>
  );
};
