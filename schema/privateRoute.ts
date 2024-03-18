import { PrivateRouteType } from "@/types/privateRoute";

export const privateRoute: PrivateRouteType = {
  GET: [
    {
      apiPath: "/api/master-data/gallery",
      role: ["super-admin", "staff"],
    },
    {
      apiPath: "/api/master-data",
      role: ["super-admin", "staff"],
    },
    {
      apiPath: "/api/article",
      role: ["super-admin", "staff"],
    },
    {
      apiPath: "/api/article/[id]",
      role: ["super-admin", "staff"],
    },
  ],
  POST: [
    {
      apiPath: "/api/master-data/gallery",
      role: ["super-admin", "staff"],
    },
    {
      apiPath: "/api/article",
      role: ["super-admin", "staff"],
    },
  ],
  PATCH: [
    {
      apiPath: "/api/article/[id]/publish",
      role: ["super-admin", "staff"],
    },
  ],
  DELETE: [
    {
      apiPath: "/api/article/[id]",
      role: ["super-admin", "staff"],
    },
  ],
};
