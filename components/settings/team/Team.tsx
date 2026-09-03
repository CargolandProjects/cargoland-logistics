import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetTeamMembers } from "@/lib/hooks/queries/useTeam";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import AddMemberModal from "./AddMemberModal";
import { Skeleton } from "@/components/ui/skeleton";
import { Delete, Invite } from "@/components/icons";

const statusStyles = {
  PENDING: {
    bgcolor: "bg-orange-400",
    containerStyles: "border-orange-400 bg-orange-400/5 text-orange-400",
  },
  ACTIVE: {
    bgcolor: "bg-cargo-success",
    containerStyles:
      "border-cargo-success bg-cargo-success/5 text-cargo-success",
  },
};

const LoadingState = () => (
  <div className="mt-6 md:mt-8 space-y-6">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="flex justify-between items-center">
        {/* Avatar + name/email */}
        <div className="flex gap-2 items-center">
          <Skeleton className="size-10 rounded-full" />
          <div className="space-y-1.5">
            <Skeleton className="h-4 md:h-5 w-32" />
            <Skeleton className="h-3 md:h-4 w-28 md:w-48" />
          </div>
        </div>

        {/* Role + status + delete button */}
        <div className="flex gap-2 items-center">
          <Skeleton className="h-5 w-16 max-md:hidden" />
          <Skeleton className="h-5 w-8 md:w-16 rounded-full" />
          <Skeleton className="size-4" />
        </div>
      </div>
    ))}
  </div>
);

const EmptyState = ({ setOpen }: { setOpen: (v: boolean) => void }) => {
  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="size-25 flex justify-center items-center bg-linear-to-t from-[#F6BABCCC]/80 to-[#FFFAFACC]/80 rounded-full">
        <Invite className="size-10 text-primary" />
      </div>
      <h2 className="mt-6 text-lg font-medium">Invite Team Members</h2>
      <p className="mt-3 font-light">
        Add staff or team members to your Cargoland Africa B2B Account.
      </p>
      <Button
        onClick={() => setOpen(true)}
        className="mt-2 px-4 py-1 h-auto gap-2 leading-5.5"
      >
        <Plus className="size-4" /> Invite
      </Button>
    </div>
  );
};

const Team = () => {
  const { data, isLoading, isError, isSuccess } = useGetTeamMembers();
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg">
      <div className="flex justify-between">
        <h2 className="text-lg sm:text-base font-semibold sm:font-bold leading-7 sm:leading-6">
          Team Members
        </h2>

        <Button
          onClick={() => setOpen(true)}
          className="px-4 py-1 h-auto gap-2 leading-5.5"
        >
          <Plus className="size-4" /> Invite
        </Button>
      </div>

      <Separator className="mt-2" />

      {isLoading && <LoadingState />}

      {isSuccess && data.length === 0 && <EmptyState setOpen={setOpen} />}

      {isSuccess && data.length > 0 && (
        <div className="mt-6 md:mt-8">
          {data.map((member, idx) => {
            const [firstName, lastName] = member.fullName.split(" ");
            const initials = `${firstName ? firstName?.charAt(0) : ""}${lastName ? lastName?.charAt(0) : ""}`;
            return (
              <React.Fragment key={idx}>
                <div className="flex justify-between items-center">
                  {/* profile info */}
                  <div className="flex gap-2 items-center">
                    <Avatar className="size-10 ">
                      <AvatarImage
                        src={"avatarSrc"}
                        alt="team member"
                        className="size-full object-cover"
                      />
                      <AvatarFallback className="font-medium bg-[#273583] text-white">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="">
                      <p className="text-base font-medium">{member.fullName}</p>
                      <p className="text-gray-500">{member.email}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 items-center">
                    <p className="max-md:hidden text-gray-500 capitalize">
                      {member.role.toLocaleLowerCase()}
                    </p>
                    {/* Status */}
                    <div
                      className={`${statusStyles[member.teamStatus].containerStyles} py-0.5 px-2 flex gap-1 items-center border-[1.5px] rounded-full`}
                    >
                      <div
                        className={`${statusStyles[member.teamStatus].bgcolor} size-1.5 rounded-full `}
                      />
                      <p className="text-xs leading-5">{member.teamStatus}</p>
                    </div>

                    <Button
                      variant="ghost"
                      className="ml-2 p-0 h-auto hover:bg-transparent hover:text-red-500 transition duration-200"
                    >
                      <Delete className="size-4" />
                    </Button>
                  </div>
                </div>

                {data.length - 1 !== idx && <Separator className="my-6" />}
              </React.Fragment>
            );
          })}
        </div>
      )}

      <AddMemberModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Team;
