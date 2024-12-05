import Card from "@/components/ui/Card";
import Link from "next/link";
import Form from "next/form";
import Image from "next/image";

const page = () => {
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <Card>
        <div className="flex flex-col items-center gap-10">
          <h1 className="font-bold text-4xl max-w-[70%] text-center">
            Loghează-te, chiorăie mațele!
          </h1>
          <Form
            action="/"
            className="w-[100%] flex flex-col items-center gap-20"
          >
            <div className="relative w-[100%] text-center">
              <Image
                src="/assets/icons/mail.svg"
                alt="E-mail"
                width={35}
                height={35}
                className="absolute bottom-3"
              />
              <input
                type="email"
                placeholder="E-mail"
                className="pb-3 pl-12 text-base bg-primary-dark-blue border-b-[1px] inline-block w-[100%]"
              ></input>
            </div>
            <div className="relative w-[100%] text-center">
              <Image
                src="/assets/icons/lock.svg"
                alt="Lock"
                width={35}
                height={35}
                className="absolute bottom-3"
              />
              <input
                type="password"
                placeholder="Password"
                className="pb-3 pl-12 text-base bg-primary-dark-blue border-b-[1px] inline-block w-[100%]"
              ></input>
            </div>
            <button
              type="submit"
              className="bg-primary-green rounded-lg font-bold text-4xl w-[70%] py-2"
            >
              Log in
            </button>
          </Form>
          <Link href="/forgot-password">
            <p className="font-bold text-lg underline">Forgot password</p>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default page;
