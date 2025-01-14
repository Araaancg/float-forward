import { Router } from "express";
import authRoutes from "../api/routes/auth.route";
import userRoutes from "../api/routes/users.route";
import disasterRoutes from "../api/routes/disasters.route";
import pinRoutes from "../api/routes/pin.route";
import pinTypesRoutes from "../api/routes/pinTypes.route";

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
    },
    {
      path: "/disasters",
      route: disasterRoutes(),
    },
    {
      path: "/pins",
      route: pinRoutes(),
    },
    {
      path: "/pin-types",
      route: pinTypesRoutes(),
    },
  ];

  routes.forEach((route) => {
    router.use(route.path, route.route);
  });

  return router;
};

export default routes;