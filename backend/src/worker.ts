import http from "http";
import https from "https";
import { HOST, isDev, PORT } from "./common/config";
import { initializeSocket } from "./common/helpers/socket";
import { init } from "./app";

export const worker = async () => {
  const app = await init();

  const server = isDev ? http.createServer(app) : https.createServer(app);

  initializeSocket(server);

  server
    .listen(Number(PORT), HOST, () => {
      const { pid } = process;
      console.info(`Server listening on port: ${PORT}, PID: ${pid}`);
      console.info(`Environment: ${process.env.NODE_ENV}`);
    })
    .on("error", (err) => {
      console.error(err.message);
      process.exit(1);
    });
};
