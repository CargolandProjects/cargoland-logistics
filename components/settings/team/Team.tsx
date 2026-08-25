import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetTeamMembers } from "@/lib/hooks/queries/useTeam";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import AddMemberModal from "./AddMemberModal";

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
          className="px-4 py-1 h-auto gap-2 bg-primary/30 text-primary hover:text-white duration-200 leading-5.5"
        >
          <Plus className="size-6" /> Invite
        </Button>
      </div>

      <Separator className="mt-2" />

      <div className="mt-6 md:mt-8">
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
                AO
              </AvatarFallback>
            </Avatar>
            <div className="">
              <p className="text-base font-medium">Adaeze Okoro</p>
              <p className="text-gray-500">adaeze@cargoland.africa</p>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <p className="text-gray-500">Admin</p>
            {/* Status */}
            <div className="py-0.5 px-2 flex gap-1 items-center border-[1.5px] border-cargo-success rounded-full bg-cargo-success/5">
              <div className="size-1.5 rounded-full bg-cargo-success" />
              <p className="text-xs leading-5 text-cargo-success">Active</p>
            </div>

            <Button
              variant="ghost"
              className="ml-2 p-0 h-auto hover:bg-transparent hover:text-red-500 transition duration-200"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
        <Separator className="my-6" />
      </div>

      <AddMemberModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Team;
