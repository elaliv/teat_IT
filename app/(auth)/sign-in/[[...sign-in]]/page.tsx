import { redirect } from "next/navigation";
import SignInForm from "@/components/forms/SignInForm";
import Card from "@/components/cards/Card";
import Link from "next/link";
import { isSessionValid } from "@/lib/utils";

const page = async () => {
  const isValid = await isSessionValid();
  if (isValid) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <Card>
        <div className="flex flex-col items-center gap-10">
          <h1 className="font-bold text-4xl max-w-[70%] text-center">
            Loghează-te, chiorăie mațele!
          </h1>
          <SignInForm />
          <Link href="/forgot-password">
            <p className="font-bold text-lg underline">Forgot password</p>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default page;
