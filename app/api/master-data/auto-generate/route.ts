import { cryptoAuth, random } from "@/lib/cryptoAuth";
import { prismaDB } from "@/lib/connect";

export const GET = async (req: Request) => {
  try {
    // super admin generate
    let userData = {
      salutation: "Mr.",
      firstName: "Niraj",
      lastName: "Kumar",
      gender: "male",
      email: "niraj@nexxontech.com",
      mobile: "9453800108",
      designation: "FOUNDER & CEO",
      dob: "1996-10-07",
      password: "Niraj*12345",
      role: "super-admin",
      image: "https://media.licdn.com/dms/image/D4D03AQEtKewlBPl4Ug/profile-displayphoto-shrink_800_800/0/1694267655064?e=1714003200&v=beta&t=aMneBIj_2oYozKwNP-jnHprXJLnpWQPbS-aTaaKLRzY",
    };
    let auth = await prismaDB.authentication.findUnique({ where: { email: userData.email } });
    if (!auth) {
      let salt = random();
      auth = await prismaDB.authentication.create({ data: { email: userData.email, role: userData.role, salt, password: cryptoAuth(salt, userData.password), sessionToken: "" } });
      if (!auth) {
        return Response.json({ message: "Error creating auth" }, { status: 400 });
      }
      let user = await prismaDB.user.create({
        data: {
          salutation: userData.salutation,
          firstName: userData.firstName,
          lastName: userData.lastName,
          dob: new Date(userData.dob),
          gender: userData.gender,
          designation: userData.designation,
          mobile: userData.mobile,
          authenticationId: auth.id,
          image: userData.image,
        },
      });
    }
    let header = new Headers();
    header.append("Cache-Control", "no-store");
    return Response.json({ message: "success", data: { ...auth, timeStamp: new Date() } }, { status: 200, headers: header });
  } catch (error) {
    return Response.json({ message: "Error", error }, { status: 500 });
  }
};
