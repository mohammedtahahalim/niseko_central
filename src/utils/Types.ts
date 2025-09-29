export type TTheme = "light" | "dark";
export type TRoutes = {
  path: string;
  element: React.FC;
};
export type TRoles = "admin" | "devs" | "member" | "guest";
export type TCurrentUser = {
  id: number;
  permissions: TRoles;
  name: string;
  picture: string;
  blurred_picture: string;
};
