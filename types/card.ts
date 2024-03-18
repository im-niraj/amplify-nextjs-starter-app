import { Author } from "./author";
import { CategoryType } from "./category";
import { TagType } from "./tags";

export type Card = {
  cardType: "small" | "large";
  slug: string;
  tagList: TagType[];
  categoryList: CategoryType[];
  title: string;
  description: string;
  author: Author;
  banner?: string;
  bannerCaption?: string;
  content: {
    type: string;
    content: [];
  };
};
