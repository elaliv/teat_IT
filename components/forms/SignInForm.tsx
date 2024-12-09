"use client";

import { signInUser } from "@/lib/actions/user.action";
import Form from "next/form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignInForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { badCredentials } = await signInUser({
        email,
        password,
      });

      if (badCredentials) {
        setError("Wrong email or password");
        setTimeout(() => {
          setError("");
        }, 3000);
        const form = e.target as HTMLFormElement;
        form.reset();
      } else {
        router.push("/");
      }
    } catch {
      setError("Error during log in");
      setTimeout(() => {
        setError("");
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
      <Form
        action="/"
        className="w-[100%] flex flex-col items-center gap-20"
        onSubmit={handleSubmit}
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
            required
            onChange={(e) => setEmail(e.target.value)}
          />
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
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-primary-green rounded-lg font-bold text-4xl w-[70%] py-2"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </>
  );
};

export default SignInForm;
