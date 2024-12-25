import { Router } from "express";
import authRoutes from "../../api/routes/auth.route";
import userRoutes from "../../api/routes/users.route";
import postRoutes from "../../api/routes/posts.route";
import categoryRoutes from "../../api/routes/category.route";

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
      path: "/posts",
      route: postRoutes(),
    },
    {
      path: "/categories",
      route: categoryRoutes(),
    },
  ];

  routes.forEach((route) => {
    router.use(route.path, route.route);
  });

  return router;
};

export default routes;
