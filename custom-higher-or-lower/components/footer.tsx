import Link from "next/link";

export function Footer() {
  return (
    <div className="w-full h-full lg:h-24 px-10 py-10 justify-between text-white bg-slate-900 flex flex-col gap-4 lg:flex-row">
      <Link href="/" className="text-2xl font-bold">
        HigherOrLower
      </Link>
      <div className="flex flex-col lg:flex-row gap-4">
        <Link href="/tos">Terms of Service</Link>
        <Link href="/privacy">Privacy Policy</Link>
        <Link target="_blank" href="https://github.com/AhmedFr">
          Contact me
        </Link>
      </div>
    </div>
  );
}
