import { type RouteProps } from "react-router-dom";
import { UserRoles } from "@entities/user";

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  roles?: UserRoles;
  redirect?: string;
};
