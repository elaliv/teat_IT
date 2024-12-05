import { redirect } from "next/navigation";
import { isSessionValid } from "@/lib/actions/user.action";

const page = async () => {
  const isValid = await isSessionValid();
  if (!isValid) {
    redirect("/sign-in");
  }

  return <div>Home page</div>;
};

export default page;
