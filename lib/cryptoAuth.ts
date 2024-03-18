import crypto from "crypto";
export const random = () => crypto.randomBytes(128).toString("base64");
export const cryptoAuth = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(process.env.CRYPTO_SECRET_KEY || "superSecret@nexxontech.com")
    .digest("hex");
};
