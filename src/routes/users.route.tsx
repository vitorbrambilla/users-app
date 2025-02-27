import Layout from "@/layouts/layout";
import UsersPage from "@/pages/users.page";
import { rootRoute } from "@/routes/__root";
import type { FunctionComponent } from "@/types/react.type";
import { ROUTES } from "@/utils/constants";
import { createRoute } from "@tanstack/react-router";

export const UsersRoute = createRoute({
  getParentRoute: (): typeof rootRoute => rootRoute,
  path: ROUTES.HOME,
  component: (): FunctionComponent => (
    <Layout>
      <UsersPage />
    </Layout>
  ),
});
