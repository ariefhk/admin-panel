import * as jose from "jose";
import { JWTPayload } from "jose";

const makeJwt = async (data: JWTPayload, expired: string = "") => {
  const secretEncode: Uint8Array = new TextEncoder().encode(process.env.JWT_SECRET_TOKEN);
  const alg: string = "HS256";
  let jwt;

  if (!expired) {
    jwt = await new jose.SignJWT(data).setProtectedHeader({ alg }).setIssuedAt().sign(secretEncode);
  } else {
    jwt = await new jose.SignJWT(data).setProtectedHeader({ alg }).setIssuedAt().setExpirationTime(expired).sign(secretEncode);
  }

  return jwt;
};

const decodeJwt = async (jwt?: string) => {
  if (jwt) {
    const secretEncode: Uint8Array = new TextEncoder().encode(process.env.JWT_SECRET_TOKEN);
    const { payload } = await jose.jwtVerify(jwt, secretEncode);

    return payload;
  }
};

export { makeJwt, decodeJwt };
