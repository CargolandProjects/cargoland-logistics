"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useMemo, useState } from "react";
import Loader from "../Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useWalletBalance } from "@/lib/hooks/queries/useBalance";
import { formatDate, formatMeridiem, formatTime } from "@/lib/utils";
import { Transaction } from "@/lib/services/wallet.service";

type Status = "ALL" | "CREDIT" | "DEBIT";

const TransactionHistory = () => {
  const { data, isLoading, isError, isSuccess } = useWalletBalance();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Status>("ALL");

  const transactions = useMemo(
    () => data?.transactions || [],
    [data?.transactions],
  );

  const filteredTransactions = useMemo(() => {
    const searchableFields: Array<keyof Transaction> = [
      "reference",
      "type",
      "amount",
      "status",
      "createdAt",
    ];

    let result = transactions;

    // Apply filter
    if (filter !== "ALL") {
      result = result.filter((tx) => tx.type === filter);
    }

    // Apply search
    if (search.trim()) {
      const term = search.trim().toLowerCase();
      result = result.filter((tx) => {
        return searchableFields.some((field) => {
          const value = tx[field];

          if (value === null || value === undefined) return false;

          // Special handling for date fields
          if (field === "createdAt") {
            try {
              const dateStr = formatDate(value).toLowerCase();
              const timeStr = formatTime(value).toLowerCase();
              return dateStr.includes(term) || timeStr.includes(term);
            } catch {
              return false;
            }
          }

          // Everything else: convert to string and check
          return String(value).toLowerCase().includes(term);
        });
      });
    }

    return result;
  }, [transactions, filter, search]);

  return (
    <section className="mt-[76px] md:mt-8">
      <div className="flex max-md:flex-col md:items-center">
        <h2 className="text-xl font-semibold leading-7 text-secondary">
          Transaction History
        </h2>

        {/* search input */}
        <div className="max-md:mt-6 flex-1 flex justify-end gap-4">
          <div className="relative w-full md:max-w-[291px]">
            <Input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Search here"
              className="form-input h-12.5! pl-10! min-w-[219px] placeholder:text-slate-600/90!"
            />
            <Search className="size-5 absolute top-1/2 -translate-y-1/2 left-3 text-slate-600/90" />
          </div>

          <Select
            value={filter}
            onValueChange={(val) => setFilter(val as Status)}
          >
            <SelectTrigger className="w-[148px] py-3 h-auto! px-4 text-primary-dark!">
              <SelectValue placeholder="All" />
            </SelectTrigger>

            <SelectContent position="popper">
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="CREDIT">Top-ups</SelectItem>
              <SelectItem value="DEBIT">Payments</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading && (
        <div className="mt-3 min-h-[237px] md:min-h-[337px] flex flex-col items-center justify-center rounded-lg bg-white">
          <Loader styles="size-9 sm:size-12 " />
        </div>
      )}

      {isError && (
        <div className="mt-3 min-h-[237px] md:min-h-[337px] flex flex-col rounded-lg bg-white">
          <p className="text-red-600 font-roboto ">
            Failed to fetch transaction history
          </p>
        </div>
      )}

      {isSuccess && transactions.length === 0 && (
        <div className="mt-3 min-h-[437px] flex flex-col justify-center items-center rounded-lg bg-white">
          <p className="text2xl leading-8">No Transactions Yet</p>
        </div>
      )}

      {isSuccess && transactions.length > 0 && (
        <Table className="mt-3 bg-white rounded-lg">
          <TableHeader>
            <TableRow className="h-[53px] hover:bg-white">
              <TableHead className="pl-6 text-sm font-normal leading-5.5 font-roboto text-neutral-600/90">
                Transaction ID
              </TableHead>
              <TableHead className="text-sm font-normal leading-5.5 font-roboto text-neutral-600/90">
                Type
              </TableHead>
              <TableHead className="text-sm font-normal leading-5.5 font-roboto text-neutral-600/90">
                Price
              </TableHead>
              <TableHead className="text-sm font-normal leading-5.5 font-roboto text-neutral-600/90">
                Date
              </TableHead>
              <TableHead className="text-sm font-normal leading-5.5 font-roboto text-neutral-600/90">
                Time
              </TableHead>
              <TableHead className="text-sm font-normal leading-5.5 font-roboto text-neutral-600/90">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredTransactions.map((transaction, idx) => (
              <TableRow key={idx} className="h-15.5">
                <TableCell className="pl-6 leading-5.5">
                  {transaction.reference}
                </TableCell>
                <TableCell className="leading-5.5">
                  {transaction.type === "CREDIT" ? "Wallet top-up" : "Payment"}
                </TableCell>

                <TableCell className="leading-5.5">
                  ₦{Number(transaction.amount).toLocaleString()}
                </TableCell>
                <TableCell className="leading-5.5">
                  {formatDate(transaction.createdAt)}
                </TableCell>
                <TableCell className="leading-5.5">
                  {formatTime(transaction.createdAt)}{" "}
                  {formatMeridiem(transaction.createdAt)}
                </TableCell>
                <TableCell className="">
                  <div
                    className={`px-2 py-0.5 size-fit ${
                      transaction.status === "SUCCESS"
                        ? "bg-cargo-success/5 border-cargo-success"
                        : "bg-primary/5 border-primary"
                    } flex items-center justify-center gap-1 border rounded-full text-center leading-5.5 capitalize`}
                  >
                    <div
                      className={` ${
                        transaction.status === "SUCCESS"
                          ? "bg-cargo-success"
                          : "bg-primary"
                      } size-1.5 rounded-full`}
                    />
                    <p
                      className={` ${
                        transaction.status === "SUCCESS"
                          ? "text-cargo-success"
                          : "text-primary"
                      } text-xs leading-5 capitalize`}
                    >
                      {transaction.status.toLowerCase()}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
};

export default TransactionHistory;
