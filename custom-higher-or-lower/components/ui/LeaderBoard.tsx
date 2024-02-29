import { Separator } from "@/components/ui/separator";
import { Score } from "@/types/Score";

type LeaderBoardCss = {
  [key: string]: string;
};

export function Leaderboard({ scores }: { scores: Score[] }) {
  const rankingCss: LeaderBoardCss = {
    1: " text-yellow-500 hover:bg-yellow-100",
    2: " text-gray-500",
    3: " text-orange-700 hover:bg-orange-100",
  };
  const userEmoji: LeaderBoardCss = {
    1: "👑",
    2: "🥈",
    3: "🥉",
  };

  return (
    <div className="border border-slate-300 w-full lg:w-96 h-fit rounded-xl">
      <div className="text-center bg-slate-900 text-white rounded-t-xl drop-shadow-blue text-2xl font-bold italic">
        Leaderboard
      </div>
      <Separator orientation="horizontal" className="mb-2" />
      <div className="flex flex-col gap-2 ">
        {scores.map((score: Score, i) => (
          <div key={i}>
            <div
              key={i}
              className={
                "mx-2 px-2 rounded hover:bg-slate-100 transition-all duration-200 py-1 justify-between flex gap-2 items-center" +
                rankingCss[i + 1]
              }
            >
              <div className="flex gap-1 items-center">
                <div className="text-2xl font-bold">{i + 1}</div>
                <div className="text-xl">
                  {score.username} {userEmoji[i + 1]}
                </div>
              </div>
              <p className="">{score.value}</p>
            </div>
            {i + 1 < scores.length ? (
              <Separator orientation="horizontal" />
            ) : (
              ""
            )}
          </div>
        ))}
        {scores.length === 0 && (
          <div className="text-center text-gray-500">No scores yet</div>
        )}
      </div>
    </div>
  );
}
