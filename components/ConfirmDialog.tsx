import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmAlertDialogProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  onConfirm: () => void;
  title?: string;
  desc?: string;
}

const ConfirmAlertDialog = ({
  open,
  onOpenChange,
  onConfirm,
  title = "Are You Sure?",
  desc = "Are You Sure you want to perform this action, it might not be reverible",
}: ConfirmAlertDialogProps) => {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="px-4 sm:px-8 pb-10 pt-10 sm:pt-15 gap-0 max-w-[calc(100%-2rem)]! sm:max-w-lg! rounded-[16px]">
        <AlertDialogHeader className="gap-4">
          <AlertDialogTitle className="text-2xl font-semibold leading-8 font-montserrat w-full text-center">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base font-normal leading-5 text-gray-500 text-center text-wrap">
            {desc}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="m-0 mt-6 sm:gap-2.5 p-0 bg-transparent">
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="h-12! sm:flex-1 rounded-lg border-gray-400 "
          >
            Cancel
          </Button>

          <Button
            onClick={handleConfirm}
            className="h-12! sm:flex-1 rounded-lg"
          >
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmAlertDialog;
