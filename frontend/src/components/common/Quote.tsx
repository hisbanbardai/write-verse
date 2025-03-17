export const Quote = function () {
  return (
    <div className="max-w-xl flex flex-col gap-3 lg:px-6 w-full ">
      <div>
        <p className="text-black font-bold text-3xl">
          "The customer service I received was exceptional. The support team
          went above and beyond to address my concerns."
        </p>
      </div>
      <div className="flex flex-col">
        <span className="text-black font-bold text-xl">Jules Winnfield</span>
        <span className="text-slate-600 text-lg">CEO, Acme Inc</span>
      </div>
    </div>
  );
};
