type StepCardProps = {
  number: number;
  title: string;
  body: string;
};

export function StepCard({ number, title, body }: StepCardProps) {
  return (
    <div className="w-full col-span-1 border h-fit lg:h-60 p-4 rounded-lg border-slate-300 shadow-lg">
      <h1 className="pb-1 text-xl lg:text-2xl font-bold">
        {number} - {title}
      </h1>
      <p>{body}</p>
    </div>
  );
}
