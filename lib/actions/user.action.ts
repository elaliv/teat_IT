"use server";

import { cookies } from "next/headers";
import { connectToDatabase } from "../mongodb";
import { SignInUserParams, SignUpUserParams } from "./shared.types";
import User from "@/database/user.model";
import bcrypt from "bcryptjs";
import { encrypt } from "../utils";

export async function signUpUser(params: SignUpUserParams) {
  try {
    await connectToDatabase();

    const { fullName, phoneNumber, email, password, collegeGroup } = params;

    // Check if a user with the same email or phone number already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existingUser) {
      return { invalidCredentials: true };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({fullName, phoneNumber, email, password: hashedPassword, collegeGroup});

    return { invalidCredentials: false };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function signOutUser() {
  // Destroy the session
  const cookieStore = await cookies();
  cookieStore.set("session", "", { expires: new Date(0) });
}

export async function signInUser(params: SignInUserParams) {
  try {
    await connectToDatabase();

    const { email, password } = params;      
    
    // Check if a user with the given email exists
    const user = await User.findOne({ email });
    if (!user) {
      return { badCredentials: true };
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { badCredentials: true };
    }

    // Create the session
    // Expires in 2 days
    const expires = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ user: { email }, expires });

    // Save the session in a cookie
    const cookieStore = await cookies();
    cookieStore.set("session", session, { expires, httpOnly: true });
  
    return { badCredentials: false };
  } catch (error) {
    console.log(error);
    throw error;
  }
}