import { hkdf } from "@panva/hkdf";
export const GetEncryptionKey = async () => {
  return await hkdf(
    "sha256",
    process.env.NEXTAUTH_SECRET ?? "",
    "",
    "BeatTime Generated Encryption Key",
    32
  );
};
