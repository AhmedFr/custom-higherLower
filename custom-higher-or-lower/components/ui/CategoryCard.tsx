import { Category } from "@/app/categories/page";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, User } from "lucide-react";
import Link from "next/link";

export function CategoryCard({
  name,
  slug,
  description,
  likes,
  cover_image,
  author,
}: Category) {
  return (
    <Link
      href={`/categories/${slug}`}
      className="transition-all h-80 duration-300 border rounded-lg border-slate-300 shadow hover:shadow-lg py-2"
    >
      <div className="relative w-full h-44">
        <Image src={cover_image} alt={name} fill className="w-full" />
      </div>
      <div className="px-4">
        <h3 className="text-lg truncate font-bold pt-1">{name}</h3>
        <p className="text-slate-400 h-16 text-sm">{description}</p>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="gap-1 items-center">
            <User size={12} />
            {author.name}
          </Badge>
          <Badge className="gap-1 items-center">
            {likes}
            <ThumbsUp size={12} />
          </Badge>
        </div>
      </div>
    </Link>
  );
}
