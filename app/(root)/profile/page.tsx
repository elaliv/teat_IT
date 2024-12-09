import { redirect } from "next/navigation";
import Card from "@/components/cards/Card";
import { isSessionValid } from "@/lib/utils";
import Image from "next/image";
import { getUserDetailsByEmail } from "@/lib/actions/user.action";
import AddRecipeButton from "@/components/ui/AddRecipeButton";

const page = async () => {
  const isValid = await isSessionValid();
  const user = await getUserDetailsByEmail();

  if (!isValid) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col justify-around items-center h-[90vh] pb-5">
      <div className="flex gap-10 items-center h-[90vh]">
        <Card>
          <Image
            src="/assets/icons/1Asset 1 1.svg"
            alt="Chef"
            width={108}
            height={203}
            //className="absolute bottom-3"
          />
          <input
            type="text"
            placeholder={`Name: ${user.fullName}`}
            className="placeholder-white font-medium !text-[29px] pl-3 pb-3 text-base bg-primary-dark-blue border-b-[1px] inline-block w-[100%]"
            required
            disabled
          />
        </Card>

        <Card>
          <div className="relative w-[100%] text-center">
            <input
              type="email"
              placeholder={`E-mail: ${user.email}`}
              className="placeholder-white font-medium !text-[29px] pl-3 pb-3 text-base bg-primary-dark-blue border-b-[1px] inline-block w-[100%]"
              required
              disabled
            />
            <input
              type="tel"
              placeholder={`Telephone: ${user.phoneNumber}`}
              className="placeholder-white font-medium !text-[29px] pl-3 pb-3 text-base bg-primary-dark-blue border-b-[1px] inline-block w-[100%]"
              required
              disabled
            />
            <input
              type="text"
              placeholder={`College Group: ${user.collegeGroup}`}
              className="placeholder-white font-medium !text-[29px] pl-3 pb-3 text-base bg-primary-dark-blue border-b-[1px] inline-block w-[100%]"
              required
              disabled
            />
          </div>
        </Card>
      </div>

      <AddRecipeButton />
    </div>
  );
};

export default page;
