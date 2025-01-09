import { Router } from "express";
import authRoutes from "../api/routes/auth.route";
import userRoutes from "../api/routes/users.route";

const routes = () => {
  const router = Router();

  const routes = [
    {
      path: "/auth",
      route: authRoutes(),
    },
    {
      path: "/users",
      route: userRoutes(),
    }
  ];

  routes.forEach((route) => {
    router.use(route.path, route.route);
  });

  return router;
};

export default routes;