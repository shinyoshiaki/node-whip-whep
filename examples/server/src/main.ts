import fastify from "fastify";
import { config } from "./config.js";
import { setup } from "./dependencies.js";
import { registerExternalRoutes as registerRoutes } from "./routes.js";

const server = fastify({});

(async () => {
  await setup();
  await registerRoutes(server);

  console.log("server listening", config);

  server.listen({ port: config.port, host: "0.0.0.0" }, (err) => {
    if (err) {
      console.error("server listen error", err);
    } else {
      console.log("server listened");
    }
  });
})();
