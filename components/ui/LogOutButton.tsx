"use client";

import { signOutUser } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";

const LogOutButton = () => {
  const router = useRouter();

  const onClickHandler = async () => {
    await signOutUser();
    router.push("/sign-in");
  };

  return (
    <button onClick={onClickHandler} className="border rounded-[21px] px-4">
      Log out
    </button>
  );
};

export default LogOutButton;
