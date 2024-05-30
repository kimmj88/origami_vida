import { ExServer } from "../express/exServer";
import * as controller from "controller";
import { settings } from "common";
import { Server } from "http";

export function startServer(): Server {
  const server: ExServer = new ExServer(
    [new controller.UserController()],
    settings.port
  );

  return server.listen();
}

startServer();
