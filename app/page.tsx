import { isSessionValid } from "@/lib/utils";
import { redirect } from "next/navigation";

const page = async () => {
  const isValid = await isSessionValid();
  if (!isValid) {
    redirect("/sign-in");
  }

  return <div>Home page</div>;
};

export default page;
