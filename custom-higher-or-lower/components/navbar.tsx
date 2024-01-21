"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, PlusSquare } from "lucide-react";

export function Navbar() {
  const isConnected = true;
  const username = "Ahmed2312";
  const userAvatar = "https://avatars.githubusercontent.com/u/50470012?v=4";

  function handleSignout() {
    console.log("Sign out");
  }

  return (
    <div className="absolute top-0 items-center h-20 left-0 px-10 py-4 right-0 flex justify-between">
      <div className="flex items-end gap-2">
        <Link className="text-2xl font-bold" href="/">
          HigherOrLower
        </Link>
        <Link
          className="text-lg hover:text-indigo-700 transition-all duration-75"
          href="/categories"
        >
          Categories
        </Link>
      </div>
      {isConnected ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button className="gap-1">
              <Avatar className="w-5 h-5">
                <AvatarImage src={userAvatar} alt={username} />
                <AvatarFallback>{username[0]}</AvatarFallback>
              </Avatar>
              {username}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <Link href="/maker">
                <DropdownMenuItem>
                  <PlusSquare className="mr-2 h-4 w-4" />
                  <span>Maker</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/profile">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              <button onClick={handleSignout} className="w-full">
                <DropdownMenuItem className="focus:bg-red-100">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </button>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button>
          <Link href="/login">Login</Link>
        </Button>
      )}
    </div>
  );
}