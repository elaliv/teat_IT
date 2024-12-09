import { redirect } from "next/navigation";
import Card from "@/components/cards/Card";
import AddRecipeForm from "@/components/forms/AddRecipeForm";
import { isSessionValid } from "@/lib/utils";

const page = async () => {
  const isValid = await isSessionValid();

  if (!isValid) {
    redirect("/sign-in");
  }

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <Card>
        <div className="flex flex-col items-center gap-10">
          <AddRecipeForm />
        </div>
      </Card>
    </div>
  );
};

export default page;
