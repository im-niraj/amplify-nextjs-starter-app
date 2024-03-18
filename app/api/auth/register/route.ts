import { cryptoAuth, random } from "@/lib/cryptoAuth";
import { prismaDB } from "@/lib/connect";

export const POST = async (req: Request) => {
  try {
    let { salutation, firstName, lastName, gender, email, mobile, designation, dob, password, role, image } = await req.json();
    if (!salutation || !firstName || !gender || !email || !designation || !dob || !password || !role) {
      return Response.json({ message: "All fields are required." }, { status: 400 });
    }
    let emailExists = await prismaDB.authentication.findUnique({ where: { email } });
    if (emailExists) {
      return Response.json({ message: "Email already exists" }, { status: 400 });
    }
    let salt = random();
    let auth = await prismaDB.authentication.create({ data: { email, role, salt, password: cryptoAuth(salt, password), sessionToken: "" } });
    if (!auth) {
      return Response.json({ message: "Error creating auth" }, { status: 400 });
    }
    let user = await prismaDB.user.create({
      data: {
        salutation,
        firstName,
        lastName,
        dob: new Date(dob),
        gender,
        designation,
        mobile,
        authenticationId: auth.id,
        image,
      },
    });
    if (!user) {
      return Response.json({ message: "Error creating user" }, { status: 400 });
    }
    return Response.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Error", error }, { status: 500 });
  }
};
