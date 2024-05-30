import { logger } from "common";
import { NextFunction, Request, Response, Router } from "express";
export class BaseRouter {
  public path: string;
  public router: Router;

  constructor(_path, _router) {
    this.path = _path;
    this.router = _router;

    this.initLoggerMiddleware();
  }

  protected initLoggerMiddleware() {
    this.router.use(this.path, this.router, this.bridgeMethod);
  }

  protected bridgeMethod = async (
    req: Request,
    res: Response<any>,
    next: NextFunction
  ) => {
    logger.info(`Call : {baseUrl:${req.originalUrl}^method:${req.method}}`);

    next();
  };
}
