type PrivateRouteDataType = {
  apiPath: string;
  role: Array<string>;
};
export type PrivateRouteType = {
  GET: PrivateRouteDataType[];
  POST: PrivateRouteDataType[];
  PATCH: PrivateRouteDataType[];
  DELETE: PrivateRouteDataType[];
};
