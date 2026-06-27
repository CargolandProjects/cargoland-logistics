"use client";

import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";

const CopyButton = ({ text }: { text: string }) => {
  const [open, setOpen] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      // optional: show toast here
    } catch {
      console.error("Failed to copy");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          onClick={handleCopy}
          variant="ghost"
          className="w-0 h-fit"
          aria-label="Copy"
        >
          <Copy className="size-[16px] text-secondary" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="center"
        className="w-fit px-2 py-1 text-xs bg-black text-white rounded-full"
      >
        Copied!
      </PopoverContent>
    </Popover>
  );
};

export default CopyButton;
