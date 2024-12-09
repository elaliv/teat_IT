import { isSessionValid } from "@/lib/utils";
import { URLProps } from "@/types";
import { redirect } from "next/navigation";

const page = async ({ params }: URLProps) => {
  const isValid = await isSessionValid();

  if (!isValid) {
    redirect("/sign-in");
  }

  const recipeId = params.id;

  return (
    <div className="relative z-10 text-black">Recipe with id: {recipeId}</div>
  );
};

export default page;
