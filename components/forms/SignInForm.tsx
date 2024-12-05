"use client";

import { signInUser, signUpUser } from "@/lib/actions/user.action";
import Form from "next/form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignInForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  // const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  // Sign up user
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     const { invalidCredentials } = await signUpUser({
  //       fullName: "Elena Livadaru",
  //       phoneNumber: "+40729026741",
  //       collegeGroup: "313CC",
  //       email,
  //       password,
  //     });

  //     if (invalidCredentials) {
  //       setSuccess(false);
  //       setError("User with the same email or phone number already exists");
  //       setTimeout(() => {
  //         setError("");
  //       }, 2000);
  //     } else {
  //       setError("");
  //       setSuccess(true);
  //       setTimeout(() => {
  //         router.push("/sign-in");
  //       }, 2000);
  //     }
  //   } catch {
  //     setError("Error during registration");
  //   } finally {
  //     const form = e.target as HTMLFormElement;
  //     form.reset();
  //     setIsLoading(false);
  //   }
  // };

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
      {/* {success && (
        <div role="alert" className="alert alert-success">
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>User created successfully! Redirecting...</span>
        </div>
      )} */}
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
