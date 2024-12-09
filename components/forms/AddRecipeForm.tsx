"use client";

import { useState } from "react";
import Form from "next/form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { addRecipe } from "@/lib/actions/recipe.action";

const AddRecipeForm = () => {
  const [recipeName, setRecipeName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Store the file or clear the file name if no file is selected
    setSelectedFile(file ? file : null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      let photo = "";

      if (selectedFile) {
        // Create a base64 string from the file
        const reader = new FileReader();
        const base64Promise = new Promise((resolve) => {
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
        });
        reader.readAsDataURL(selectedFile);

        photo = (await base64Promise) as string;
      }

      await addRecipe({ name: recipeName, description, photo });

      setError("");
      setSuccess(true);
      setTimeout(() => {
        router.push("/recipes");
      }, 3000);
    } catch {
      setSuccess(false);
      setError("Error during recipe creation");
      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      const form = e.target as HTMLFormElement;
      form.reset();
      setIsLoading(false);
      setSelectedFile(null);
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
      {success && (
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
          <span>Recipe created successfully! Redirecting...</span>
        </div>
      )}
      <Form
        action="/"
        className="w-[100%] flex flex-col items-center gap-12"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Recipe name:"
          className="placeholder-white font-medium !text-[29px] pl-3 pb-3 text-base bg-primary-dark-blue border-b-[1px] inline-block w-[100%]"
          required
          onChange={(e) => setRecipeName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description:"
          className="placeholder-white font-medium !text-[29px] pl-3 pb-3 text-base bg-primary-dark-blue border-b-[1px] inline-block w-[100%]"
          required
          onChange={(e) => setDescription(e.target.value)}
        />
        <label
          htmlFor="file-upload"
          className="py-1 px-3 gap-2 rounded-2xl border flex text-white font-medium text-[24px] cursor-pointer"
        >
          <Image
            src="/assets/icons/staples.svg"
            alt="Staples"
            width={26}
            height={26}
            className=""
          />
          {selectedFile ? selectedFile.name : "Upload photo"}
        </label>
        <input
          type="file"
          accept="image/*"
          id="file-upload"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <button
          type="submit"
          className="bg-primary-green rounded-lg font-bold text-4xl w-[70%] py-2"
          disabled={isLoading}
        >
          {isLoading ? "Adding recipe..." : "Add recipe"}
        </button>
      </Form>
    </>
  );
};

export default AddRecipeForm;
