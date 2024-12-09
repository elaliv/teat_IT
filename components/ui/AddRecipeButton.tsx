"use client";

import Link from "next/link";

const AddRecipeButton = () => {
  return (
    <Link
      href="/add-recipe"
      className="relative z-10 bg-primary-green rounded-lg font-bold text-4xl w-[30%] pb-2"
      // disabled={isLoading}
    >
      {/* {isLoading ? "Signing up..." : "Sign up"} */}
      Add a recipe
    </Link>
  );
};

export default AddRecipeButton;
