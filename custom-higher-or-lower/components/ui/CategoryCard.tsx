import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, User } from "lucide-react";
import Link from "next/link";
import { Category } from "@/types/Category";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export function CategoryCard({
  name,
  slug,
  description,
  likes,
  image,
  author,
}: Category) {
  return (
    <Link
      href={`/categories/${slug}`}
      className="transition-all h-80 duration-300 border rounded-lg border-slate-300 shadow hover:shadow-lg pb-2"
    >
      <div className="relative w-full h-44">
        <Image src={image} alt={name} fill className="w-full rounded-t-lg" />
      </div>
      <div className="px-4">
        <h3 className="text-lg truncate font-bold pt-1">{name}</h3>
        <p className="text-slate-400 h-16 text-sm">{description}</p>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="flex gap-1 items-center">
            <Avatar className="w-3 h-3">
              <AvatarImage src={author.image} alt={author.username} />
              <AvatarFallback>{author.username[0]}</AvatarFallback>
            </Avatar>
            {author.username}
          </Badge>
          <Badge className="flex gap-1 items-center">
            {likes ?? 0}
            <ThumbsUp size={12} />
          </Badge>
        </div>
      </div>
    </Link>
  );
}
