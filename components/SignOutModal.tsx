import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface SignOutModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  handleSignout: () => void;
}

const SignOutModal = ({ open, setOpen, handleSignout }: SignOutModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="px-8 pt-15 pb-10 gap-0">
        <DialogHeader className="gap-4">
          <DialogTitle className="text-2xl font-semibold leading-8">
            Logout
          </DialogTitle>
          <DialogDescription className="text-base leading-5">
            Are you sure you want to Log out of your account?{" "}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex items-center justify-end gap-2 font-roboto ">
          <Button
            onClick={() => setOpen(false)}
            variant="outline"
            className="flex-1 h-13.75 border-[1.5px] border-slate-300 rounded-md text-base"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSignout}
            className=" flex-1 h-13.75 rounded-md text-base"
          >
            Log Out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignOutModal;
