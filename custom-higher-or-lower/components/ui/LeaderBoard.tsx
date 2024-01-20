import { User } from "@/app/categories/page";
import { Separator } from "@/components/ui/separator";

type UserScore = {
  id: number;
  name: string;
  avatar: string;
  score: number;
};

type LeaderBoardProps = {
  users: UserScore[];
};

type LeaderBoardCss = {
  [key: string]: string;
};

export function Leaderboard({ users }: LeaderBoardProps) {
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
    <div className="border border-slate-300 w-96 h-fit rounded-xl">
      <div className="text-center bg-slate-900 text-white rounded-t-xl drop-shadow-blue text-2xl font-bold italic">
        Leaderboard
      </div>
      <Separator orientation="horizontal" className="mb-2" />
      <div className="flex flex-col gap-2 ">
        {users.map((user, i) => (
          <>
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
                  {user.name} {userEmoji[i + 1]}
                </div>
              </div>
              <p className="">{user.score}</p>
            </div>
            {i + 1 < users.length ? <Separator orientation="horizontal" /> : ""}
          </>
        ))}
      </div>
    </div>
  );
}
