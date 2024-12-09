import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const key = new TextEncoder().encode(process.env.AUTH_SECRET);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2d")
    .sign(key);
}

interface UserPayload {
  user: {
    email: string;
  };
}

export async function getUserEmailFromToken() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return false;

  try {
    const { payload: { user } } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    }) as { payload: UserPayload };

    return user.email;
  } catch {
    console.log("Invalid token");
    return "";
  }
}

export async function isSessionValid() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return false;

  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });

    // Check if the token has expired
    const { exp } = payload;
    if (exp && Date.now() >= exp * 1000) {
      console.log("Token has expired");
      return false;
    }

    return true;
  } catch {
    console.log("Invalid token");
    return false;
  }
}

/**
 * Decodes a base64 string and converts it to a proper URL format
 * @param base64String - The base64 string to decode
 * @returns A URL that can be used with Next.js Image component
 */
export function decodeImageURI(base64String: string | undefined | null): string {
  if (!base64String) {
    return '/assets/images/default-food-photo.png'; // Replace with your default image path
  }

  try {
    // If it's already a URL, return it as is
    if (base64String.startsWith('http://') || base64String.startsWith('https://')) {
      return base64String;
    }

    // If it's already a properly formatted data URL, return it
    if (base64String.startsWith('data:image/')) {
      return base64String;
    }

    // Remove any 'base64,' prefix if it exists
    const cleanBase64 = base64String.replace(/^base64,/, '');

    // Create a proper data URL
    return `data:image/jpeg;base64,${cleanBase64}`;
  } catch (error) {
    console.error('Error decoding image URI:', error);
    return '/assets/images/default-placeholder.png'; // Replace with your default image path
  }
}

