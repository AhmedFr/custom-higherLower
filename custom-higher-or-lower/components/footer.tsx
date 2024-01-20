import Link from "next/link";

export function Footer() {
  return (
    <div className="w-full h-24 px-10 py-10 justify-between text-white bg-slate-900 flex flex-wrap">
      <Link href="/" className="text-2xl font-bold">
        HigherOrLower
      </Link>
      <div className="flex gap-4">
        <Link href="/tos">Terms of Service</Link>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="https://github.com/AhmedFr">Contact me</Link>
      </div>
    </div>
  );
}
