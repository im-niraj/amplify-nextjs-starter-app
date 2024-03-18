import { AdminLink } from "@/types/admin";
import { Author } from "@/types/author";
import { CategoryType } from "@/types/category";
import { PageType } from "@/types/page-type";
import { TagType } from "@/types/tags";

const categoryPrefix = "/category";
const tagPrefix = "/tag";
export const pageList: PageType[] = [
  {
    id: "1",
    label: "Home",
    href: "/",
    isActive: true,
  },
  {
    id: "2",
    label: "Blogs",
    href: "/blogs",
    isActive: false,
  },
  {
    id: "3",
    label: "Gallery",
    href: "/gallery",
    isActive: false,
  },
  {
    id: "4",
    label: "About",
    href: "/about",
    isActive: true,
  },
  {
    id: "5",
    label: "Contact",
    href: "/contact",
    isActive: true,
  },
];
export const categoryList: CategoryType[] = [
  {
    id: "1",
    label: "टेक्नोलॉजी",
    href: categoryPrefix + "/technology",
    isActive: true,
  },
  {
    id: "2",
    label: "ऑटोमोबाइल",
    href: categoryPrefix + "/automobile",
    isActive: true,
  },
  {
    id: "3",
    label: "बिज़नेश",
    href: categoryPrefix + "/business",
    isActive: true,
  },
  {
    id: "4",
    label: "फाइनेंस",
    href: categoryPrefix + "/finance",
    isActive: true,
  },
  {
    id: "5",
    label: "एजुकेशन",
    href: categoryPrefix + "/education",
    isActive: true,
  },
];

export const tagList: TagType[] = [
  {
    id: "1",
    label: "मोबाइल",
    href: tagPrefix + "/mobile",
    isActive: true,
  },
  {
    id: "2",
    label: "एसेसरीज़",
    href: tagPrefix + "/accessories",
    isActive: true,
  },
  {
    id: "3",
    label: "इलेक्ट्रिक कार",
    href: tagPrefix + "/electric-car",
    isActive: true,
  },
  {
    id: "4",
    label: "इलेक्ट्रिक बाइक",
    href: tagPrefix + "/electric-bike",
    isActive: true,
  },
  {
    id: "5",
    label: "कार",
    href: tagPrefix + "/car",
    isActive: true,
  },
  {
    id: "6",
    label: "बाइक",
    href: tagPrefix + "/bike",
    isActive: true,
  },
  {
    id: "7",
    label: "योजना",
    href: tagPrefix + "/schemes",
    isActive: true,
  },
];

export const authorList: Omit<Author, "article_createdAt">[] = [
  {
    id: "1",
    firstName: "Niraj",
    lastName: "Kumar",
    dob: new Date(1996, 6, 10),
    gender: "MALE",
    salutation: "Mr.",
    email: "niraj@nexxontech.com",
    image: "https://media.licdn.com/dms/image/D4D03AQEtKewlBPl4Ug/profile-displayphoto-shrink_800_800/0/1694267655064?e=1714003200&v=beta&t=aMneBIj_2oYozKwNP-jnHprXJLnpWQPbS-aTaaKLRzY",
    designation: "Content Writer",
  },
];

const adminPrefix = "/admin-nxt9";
export const sidebar: AdminLink[] = [
  {
    id: "a1",
    href: adminPrefix,
    label: "Dashboard",
  },
  {
    id: "a2",
    href: adminPrefix + "/category",
    label: "Category",
  },
  {
    id: "a3",
    href: adminPrefix + "/tag",
    label: "Tags",
  },
  {
    id: "a4",
    href: adminPrefix + "/article",
    label: "Articles",
  },
  {
    id: "a5",
    href: adminPrefix + "/new-article",
    label: "New Article",
  },
  {
    id: "a6",
    href: adminPrefix + "/gallery",
    label: "Gallery",
  },
];

export const roleList = ["super-admin", "staff"];
