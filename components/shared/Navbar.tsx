import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-primary-dark-blue w-full rounded-bl-[25px] rounded-br-[25px] text-white shadow-nav-shadow">
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
        <div className="flex items-center gap-5">
          <Link href="/recipes" className="border rounded-[21px] px-4 py-1">
            Login
          </Link>
          <Link href="/add-recipe">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
