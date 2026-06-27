// components/Pagination.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblings?: number; // how many pages to show on each side of current
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblings = 1,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Helper: generate a range of numbers
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const getPages = (): (number | "dots")[] => {
    const first = 1;
    const last = totalPages;

    // Calculate left and right sibling positions
    const leftSibling = Math.max(currentPage - siblings, first);
    const rightSibling = Math.min(currentPage + siblings, last);

    // Should we show dots?
    const showLeftDots = leftSibling > first + 1;
    const showRightDots = rightSibling < last - 1;

    // Case 1: No dots needed (all pages fit)
    if (!showLeftDots && !showRightDots) {
      return range(first, last);
    }

    // Case 2: Only right dots
    if (!showLeftDots && showRightDots) {
      const leftPages = range(first, rightSibling + 1);
      return [...leftPages, "dots", last];
    }

    // Case 3: Only left dots
    if (showLeftDots && !showRightDots) {
      const rightPages = range(leftSibling - 1, last);
      return [first, "dots", ...rightPages];
    }

    // Case 4: Both left and right dots
    const middlePages = range(leftSibling, rightSibling);
    return [first, "dots", ...middlePages, "dots", last];
  };

  const pages = getPages();

  return (
    <nav
      className="flex items-center justify-center gap-1 mt-6 transition duration-600"
      aria-label="Pagination"
    >
      <Button
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="size-9 rounded-full"
        aria-label="Previous page"
      >
        <ChevronLeft className="size-5" />
      </Button>

      {pages.map((page, index) => {
        if (page === "dots") {
          return (
            <span
              key={`dots-${index}`}
              className="px-2 text-sm text-gray-500 select-none"
            >
              …
            </span>
          );
        }

        return (
          <Button
            key={page}
            variant={currentPage === page ? "outline" : "ghost"}
            size="sm"
            onClick={() => onPageChange(page)}
            className={`size-9 min-w-9 text-sm font-normal ${
              currentPage === page
                ? "border-primary text-primary hover:bg-primary/90 hover:text-white!"
                : "hover:bg-accent text-gray-500"
            }`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </Button>
        );
      })}

      <Button
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="size-9 rounded-full"
        aria-label="Next page"
      >
        <ChevronRight className="size-5" />
      </Button>
    </nav>
  );
}
