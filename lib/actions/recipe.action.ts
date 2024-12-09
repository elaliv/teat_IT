"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongodb";
import { getUserEmailFromToken } from "../utils";
import { AddRecipeParams, GetAuthorNameByIdParams } from "./shared.types";
import Recipe from "@/database/recipe.model";

export async function addRecipe(params: AddRecipeParams) {
  try {
    connectToDatabase();

    const { name, description, photo = "", rating = 0, numberOfRatings = 0 } = params;
    
    const email = await getUserEmailFromToken();
    if (!email) {
      throw new Error("Invalid token");
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    await Recipe.create({ name, description, photo, rating, numberOfRatings, author: user._id });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllRecipes() {
  try {
    connectToDatabase();

    // Retrieve all recipes from the database
    const recipes = await Recipe.find();

    return recipes; 
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAuthorNameById(params: GetAuthorNameByIdParams) {
  try {
    connectToDatabase();

    const { id } = params;

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    // Return the user's name
    return user.fullName;
  } catch (error) {
    console.log(error);
    throw error;
  }
}