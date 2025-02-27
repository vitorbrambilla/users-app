import { createRouter } from "@tanstack/react-router";

import { NotFound } from "@/pages/not-found.page";
import { rootRoute } from "./__root";
import { UsersRoute } from "./users.route";

const routeTree = rootRoute.addChildren([UsersRoute]);

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound,
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export { router };
