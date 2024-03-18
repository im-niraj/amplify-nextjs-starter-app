import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { generateMasterData } from "./lib/generateMaster";

export const middleware = async (request: NextRequest) => {
  const { pathname }: { pathname: string } = request.nextUrl;
  await generateMasterData();
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin-login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/admin-nxt9/:path*"],
};
