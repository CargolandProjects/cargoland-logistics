"use client";

import { useSession } from "@/lib/hooks/useSession";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { Menu, Search, UserCircleIcon } from "lucide-react";
import { Bell, HelpCircle } from "../icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import SignOutModal from "../SignOutModal";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const B2BHeader = ({ setOpenMenu }: { setOpenMenu: (v: boolean) => void }) => {
  const { isAuthenticated, session, isTeamMember, signOut } = useSession();
  const [open, setOpen] = useState(false);

  const initials =
    (session?.firstName &&
      session?.lastName &&
      `${session?.firstName.charAt(0)}${session?.lastName.charAt(0)}`.toUpperCase()) ||
    "";

  const handleSignout = () => {
    signOut();
    setOpen(false);
  };

  return (
    <header className="px-4 md:px-10 py-4 bg-white">
      <div className="container flex gap-2 items-center justify-between">
        <button onClick={() => setOpenMenu(true)} className="lg:hidden">
          <Menu />
        </button>

        {/* Search bar */}
        <div className="max-lg:hidden relative flex-1 max-w-79">
          <Search className="absolute size-5 left-3 top-1/2 -translate-y-1/2 text-gray-700" />
          <Input
            placeholder="Search here"
            className="form-input pl-10! pr-3! py-2.5! h-10! border-none bg-gray-50"
          />
        </div>

        {/* Desktop nav links */}
        {/* <nav className="max-md:hidden">
          <ul className="flex gap-6 lg:gap-10.5">
            {b2bLinks.map((link, idx) => {
              const active = link.href === pathName;
              return (
                <li
                  key={idx}
                  className={` ${
                    active && "bg-primary/8 rounded-[4px] p-2 text-primary"
                  } text-sm leading-5 flex items-center gap-1.5 hover:text-primary duration-200`}
                >
                  <Link href={link.href}>{link.title}</Link>
                </li>
              );
            })}
          </ul>
        </nav> */}

        <div className="flex items-center gap-3 md:gap-6">
          <div className="px-4 py-2 flex items-center gap-1.5 bg-primary-light rounded-md text-primary">
            <HelpCircle className="size-4" />
            <p className="font-medium">24/7 Priority Support</p>
          </div>

          <Button
            variant="ghost"
            className="relative size-10! h-auto rounded-full bg-gray-50"
          >
            <div className="absolute size-2 top-2.25 right-2.25 rounded-full bg-primary" />

            <Bell className="size-5" />
          </Button>

          {/* Vertical bar */}
          <div className="max-md:hidden w-px h-6 bg-gray-200" />

          {/*  Desktop dropdown menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {isAuthenticated ? (
                <div className="flex gap-2.5 shrink-0 cursor-pointer">
                  <Avatar className="size-9">
                    <AvatarImage
                      src={session?.userProfileUrl || undefined}
                      alt={session?.lastName}
                    />
                    <AvatarFallback className="max-sm:text-xs pt-0.5">
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="max-md:hidden flex items-center ">
                    <div>
                      <p className="font-medium">
                        {session?.firstName} {session?.lastName}
                      </p>
                      <p className="text-xs text-neutral-500 max-w-[110px] line-clamp-1">
                        {session?.companyName}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 max-md:hidden">
                  <UserCircleIcon className="size-6" />
                  <p>
                    <Link
                      href="/login"
                      className="leading-5 hover:text-primary duration-200 hover:underline underline-offset-[1.5px]"
                    >
                      Login
                    </Link>
                    /
                    <Link
                      href="/signup"
                      className="leading-5 hover:text-primary duration-200 hover:underline underline-offset-[1.5px]"
                    >
                      Register
                    </Link>
                  </p>
                </div>
              )}
            </DropdownMenuTrigger>

            {isAuthenticated && (
              <DropdownMenuContent sideOffset={8} className=" space-y-2 p-2">
                {!isTeamMember && (
                  <DropdownMenuItem
                    asChild
                    className="p-0 font-medium leading-5.5 hover:p-2 hover:bg-primary/8! duration-200 cursor-pointer"
                  >
                    <Link href="/b2b/settings">Profile</Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem
                  asChild
                  className="font-medium leading-5.5 hover:p-2 hover:bg-primary/8! duration-200 cursor-pointer"
                >
                  <Button
                    onClick={() => setOpen(true)}
                    variant="ghost"
                    className="p-0 w-full justify-start h-fit text-black hover:text-destructive! hover:bg-destructive/10! font-roboto"
                  >
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        </div>
      </div>

      <SignOutModal
        open={open}
        setOpen={setOpen}
        handleSignout={handleSignout}
      />
    </header>
  );
};

export default B2BHeader;
