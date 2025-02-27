import { createRootRoute, Outlet } from "@tanstack/react-router";
import type { FunctionComponent } from "../types/react.type";

export const rootRoute = createRootRoute({
  component: (): FunctionComponent => <Outlet />,
});
