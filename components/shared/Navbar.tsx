import Image from "next/image";
import Link from "next/link";
import { isSessionValid } from "@/lib/utils";
import LogOutButton from "../ui/LogOutButton";

const Navbar = async () => {
  const isValid = await isSessionValid();

  return (
    <nav className="relative bg-primary-dark-blue w-full rounded-bl-[25px] rounded-br-[25px] text-white shadow-nav-shadow z-10">
      <div className="flex justify-between px-12 py-4">
        <div className="flex gap-20">
          <Image
            src="/assets/icons/logo.svg"
            alt="chef IT"
            width={90}
            height={90}
          />
          <div className="flex items-center gap-5">
            <Link href="/recipes">Recipes</Link>
            <Link href="/add-recipe">Add Recipe</Link>
          </div>
        </div>
        {isValid ? (
          <LogOutButton />
        ) : (
          <div className="flex items-center gap-5">
            <Link href="/sign-in" className="border rounded-[21px] px-4 py-1">
              Login
            </Link>
            <Link href="/sign-up">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
