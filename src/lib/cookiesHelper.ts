import crypto from "crypto";
import { parse } from "cookie";

/**
 * return the decrypted value
 */
export const decrypt = (encrypted: string) => {
  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    crypto.scryptSync(process.env.SESSIONSECRET, "GfG", 32),
    process.env.SESSIONIV
  );
  let decrypted = decipher.update(encrypted, "base64", "utf8");
  return decrypted + decipher.final("utf8");
};

/**
 *
 * This function will get the decrypted value from cookie
 *
 * @param cookies a cookie string, `req.headers.cookie` from `NextApiRequest`
 * @param target target cookie
 */
export const getCookie = (cookies: string, target: string) => {
  const encrypted = parse(cookies)[target];
  if (!encrypted) {
    throw new Error("COOKIES_NOT_FOUND");
  }
  return decrypt(encrypted);
};
