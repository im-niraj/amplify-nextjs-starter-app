import "next-auth";
import { DefaultSession } from "next-auth";
import { DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
declare module "next-auth" {
  interface User extends DefaultUser {
    name: { firstName: string; lastName?: string };
    email: string;
    image: string;
    role: string;
    designation: string;
    token?: string;
  }
  interface Session extends DefaultSession {
    user?: User;
    token: string;
    expires: ISODateString;
  }
  interface JWT extends DefaultJWT {
    user?: User;
  }
}
