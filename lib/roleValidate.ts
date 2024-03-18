import { ResponseStatus } from "@/types/responseStatus";
import { getServerSession } from "next-auth";
import { privateRoute } from "@/schema/privateRoute";
import { Methods } from "@/types/method";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";

export const roleValidate = async ({ apiPath, method }: { apiPath: string; method: Methods }): Promise<ResponseStatus> => {
  try {
    let session = await getServerSession(authOptions);
    if (session?.user) {
      switch (method) {
        case Methods.GET: {
          let element = privateRoute.GET.find((el) => el.apiPath === apiPath);
          if (element) {
            let isRoleExists = element.role.findIndex((el) => el === session?.user?.role);
            if (isRoleExists === -1) {
              return { statusCode: 403, status: false };
            }
            return { status: true, loggedInUserId: session.user.id };
          }
          return { statusCode: 403, status: false };
        }
        case Methods.POST: {
          let element = privateRoute.POST.find((el) => el.apiPath === apiPath);
          if (element) {
            let isRoleExists = element.role.findIndex((el) => el === session?.user?.role);
            if (isRoleExists === -1) {
              return { statusCode: 403, status: false };
            }
            return { status: true, loggedInUserId: session.user.id };
          }
          return { statusCode: 403, status: false };
        }
        case Methods.PATCH: {
          let element = privateRoute.PATCH.find((el) => el.apiPath === apiPath);
          if (element) {
            let isRoleExists = element.role.findIndex((el) => el === session?.user?.role);
            if (isRoleExists === -1) {
              return { statusCode: 403, status: false };
            }
            return { status: true, loggedInUserId: session.user.id };
          }
          return { statusCode: 403, status: false };
        }
        case Methods.DELETE: {
          let element = privateRoute.DELETE.find((el) => el.apiPath === apiPath);
          if (element) {
            let isRoleExists = element.role.findIndex((el) => el === session?.user?.role);
            if (isRoleExists === -1) {
              return { statusCode: 403, status: false };
            }
            return { status: true, loggedInUserId: session.user.id };
          }
          return { statusCode: 403, status: false };
        }
        default:
          return { statusCode: 403, status: false };
      }
    } else {
      return { statusCode: 403, status: false };
    }
  } catch (error) {
    return { statusCode: 500, status: false };
  }
};

export const permissionValidate = async (req: Request) => {};
