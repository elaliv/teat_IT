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

