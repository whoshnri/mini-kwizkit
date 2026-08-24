import * as jose from "jose";
import { env } from "./env";

type MintTokenInput = {
  roomId: string;
  participantId: string;
  name: string;
  role: "student" | "proctor";
};

export async function mintLiveKitToken(input: MintTokenInput) {
  if (!env.livekitApiKey || !env.livekitApiSecret) {
    return {
      ok: false as const,
      message: "LiveKit credentials are not configured.",
    };
  }

  try {
    const secret = new TextEncoder().encode(env.livekitApiSecret);
    const jwt = new jose.SignJWT({
      name: input.name,
      video: {
        roomJoin: true,
        room: input.roomId,
        canPublish: input.role === "student",
        canSubscribe: input.role === "proctor",
        canPublishData: true,
      },
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuer(env.livekitApiKey)
      .setExpirationTime("6h")
      // Subtract 5 minutes from issuance time to account for potential clock drift/skew
      .setNotBefore(new Date(Date.now() - 5 * 60 * 1000))
      .setSubject(input.participantId);

    const token = await jwt.sign(secret);

    return {
      ok: true as const,
      token,
      roomId: input.roomId,
      participantId: input.participantId,
      name: input.name,
    };
  } catch (error) {
    return {
      ok: false as const,
      message: error instanceof Error ? error.message : "Failed to generate token",
    };
  }
}

