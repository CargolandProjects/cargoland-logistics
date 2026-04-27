"use client";

import Cancel from "@/components/icons/Cancel";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const AuthPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(true);

  if (!showPrompt) return null;

  const handleClose = () => {
    setShowPrompt(false);
  };

  return (
    <div className="h-16 px-6 bg-primary/10 rounded-lg flex justify-between items-center">
      <p className="text-sm leading-5.5 text-primary">
        Please{" "}
        <Link href="#" className="underline underline-offset-[1.5px]">
          log in{" "}
        </Link>
        or{" "}
        <Link href="#" className="underline underline-offset-[1.5px]">
          create an account{" "}
        </Link>
        to continue.
      </p>

      <Button
        onClick={handleClose}
        className="size-8 rounded-full bg-primary/5"
      >
        <Cancel className="size-5 text-primary-dark" />
      </Button>
    </div>
  );
};

export default AuthPrompt;
