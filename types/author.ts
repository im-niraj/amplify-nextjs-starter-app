export type Author = {
  id: string;
  firstName: string;
  lastName?: string;
  salutation: string;
  image: string;
  designation: string;
  dob?: Date;
  gender: "MALE" | "FEMALE";
  email: string;
  profileUrl?: string;
  article_createdAt: Date;
};
