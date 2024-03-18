import { cryptoAuth, random } from "@/lib/cryptoAuth";
import { prismaDB } from "@/lib/connect";

export const POST = async (req: Request) => {
  try {
    let { email, password } = await req.json();
    if (!email || !password) {
      return Response.json({ message: "All fields required" }, { status: 400 });
    }
    let auth = await prismaDB.authentication.findUnique({ where: { email } });
    if (!auth) {
      return Response.json({ message: "Invalid credential" }, { status: 400 });
    }
    const expectedHash = cryptoAuth(auth.salt, password);
    if (auth.password !== expectedHash) {
      return Response.json({ message: "Unauthorized" }, { status: 403 });
    }

    let salt = random();
    let user = await prismaDB.user.findUnique({ where: { authenticationId: auth.id } });
    if (!user) {
      return Response.json({ message: "User deleted" }, { status: 400 });
    }
    let updated = await prismaDB.authentication.update({ where: { id: auth.id }, data: { sessionToken: cryptoAuth(salt, user.id) } });

    let data = {
      id: user.id,
      name: { firstName: user.firstName, lastName: user.lastName },
      email: auth.email,
      image: user.image,
      role: auth.role,
      designation: user.designation,
      token: updated.sessionToken,
    };
    return Response.json({ message: "Login successfully", user: data, timeStamp: new Date() }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error });
  }
};
