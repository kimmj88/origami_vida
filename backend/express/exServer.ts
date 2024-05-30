import express from "express";
// import swaggerJsdoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";
import { errorMiddleware } from "common";

export class ExServer {
  public app: any;
  public port: number;

  constructor(controllers, port) {
    this.app = express();
    this.port = port;

    this.initializeUtilMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorMiddleware();
  }

  private initializeErrorMiddleware() {
    //#region Error Handler
    this.app.use(errorMiddleware);
    //#endregion
  }

  private initializeUtilMiddlewares() {
    //#region Enabled CORS
    const cors = require("cors");
    const corsOptions = {
      origin: "http://localhost:9000",
      optionsSuccessStatus: 200,
    };
    this.app.use(cors(corsOptions));
    //#endregion

    //#region Enabled Swagger
    // const options = {
    //   url: 'http://localhost:3000/api-docs/petstore-api.json',
    //   definition: {
    //     openapi: '3.0.0',
    //     info: {
    //       title: 'default',
    //       version: '1.0.0',
    //     },
    //   },
    //   apis: ['src-electron/swagger/*.ts'],
    // };
    // const swaggerSpec = swaggerJsdoc(options);
    // this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    //#endregion

    //#region Enabled JSON
    this.app.use(express.json());
    //#endregion
  }
  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  public listen(): any {
    return this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  public close() {
    this.app.close((err) => {
      console.log("server closed");
      process.exit(err ? 1 : 0);
    });
  }
}
