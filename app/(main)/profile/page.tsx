"use client";

import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";
import { ArrowRight2, LockOutline } from "@/components/icons"
import UpdateProfile from "@/components/profile/UpdateProfile";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import UpdatePassword from "@/components/profile/UpdatePassword";
import { useProtectedRoute } from "@/lib/hooks/useProtectedRoute";

export default function ProfilePage () {
  const [tab, setTab] = useState<"profile" | "password" >("profile");
  const [showMobile, setShowMobile] = useState(false);
  const { isChecking } = useProtectedRoute();

  if (isChecking) {
    return null;
  }

  return (
    <div className="mt-15 md:mt-16.5 relative">
      <div className="padding-x">
        <h1 className="font-bold text-[32px] leading-10 ">My Profile</h1>
        <p className="text-base font-light leading-6">
          Manage your account, company, and how Cargoland works for your team.
        </p>

        <div className="mt-10 grid sm:grid-cols-[200px_1fr] md:grid-cols-[265px_1fr] gap-8 lg:gap-14.5">
          <div className="space-y-2">
            <Button
              onClick={() => {
                setTab("profile");
                setShowMobile(true);
              }}
              className="p-3 w-full h-14 flex items-center justify-between text-black rounded-[12px] bg-white"
            >
              <div className="flex gap-3.75 items-center">
                <div className="size-8 bg-muted rounded-full flex justify-center items-center">
                  <UserCircleIcon className="size-4.5" />
                </div>
                <span className="text-base font-medium leading-6">Profile</span>
              </div>
              <ArrowRight2 className="size-4" />
            </Button>

            <Button
              onClick={() => {
                setTab("password");
                setShowMobile(true);
              }}
              className="p-3 w-full h-14 flex items-center justify-between text-black rounded-[12px] bg-white"
            >
              <div className="flex gap-3.75 items-center">
                <div className="size-8 bg-muted rounded-full flex justify-center items-center">
                  <LockOutline className="size-4.5" />
                </div>
                <span className="text-base font-medium leading-6">
                  Reset Password
                </span>
              </div>
              <ArrowRight2 className="size-4" />
            </Button>
          </div>

          <div className="max-sm:hidden">
            {tab === "profile" && (
              <UpdateProfile setShowMobile={setShowMobile} />
            )}
            {tab === "password" && (
              <UpdatePassword setShowMobile={setShowMobile} />
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {tab === "profile" && showMobile && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "tween",
              ease: "easeOut",
              duration: 0.2,
            }}
            className="sm:hidden absolute top-0 w-full z-25"
          >
            <UpdateProfile setShowMobile={setShowMobile} />
          </motion.div>
        )}

        {tab === "password" && showMobile && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "tween",
              ease: "easeOut",
              duration: 0.2,
            }}
            className="sm:hidden absolute top-0 w-full z-25"
          >
            <UpdatePassword setShowMobile={setShowMobile} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


