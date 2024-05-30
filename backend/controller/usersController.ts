import { NextFunction, Request, Response, Router } from "express";
import {
  HTTP_STATUS_CODE,
  DATABASE_STATUS_CODE,
  databaseMsg,
  HttpException,
  BaseRouter,
} from "common";

import { getUserService } from "service";
import { Users, API_USER, LoadUser, SelectUser } from "class";

export class UserController extends BaseRouter {
  constructor() {
    super(`/${API_USER}`, Router());
    this.initalizeRoutes();
  }

  public initalizeRoutes() {
    this.router.get(this.path, this.getUser);
  }

  getUser = async (
    req: Request,
    res: Response<LoadUser>,
    next: NextFunction
  ) => {
    try {
      const reqParam: SelectUser = {
        user_key: Number(req.query.user_key),
      };
      const users: Users[] = await getUserService(reqParam);

      const result: LoadUser = {
        users: users,
        row_count: users.length,
        message:
          users.length === 0
            ? (databaseMsg.get(DATABASE_STATUS_CODE.NODATA) as string)
            : (databaseMsg.get(DATABASE_STATUS_CODE.OK) as string),
      };

      res.status(HTTP_STATUS_CODE.OK).json(result);
    } catch (error) {
      next(new HttpException(HTTP_STATUS_CODE.SERVER_ERR, error as string));
    }
  };
}
//   createPolicy = async (
//     req: Request,
//     res: Response<ResponsePost>,
//     next: NextFunction
//   ) => {
//     try {
//       const reqParam: RequestPostPolicy = {
//         protocol_type: req.query.protocol_type as string,
//         name: req.query.name as string,
//       };
//       const returnID: number = await setPolicyService(reqParam);
//       const result: ResponsePost = {
//         lastID: returnID,
//         message: databaseMsg.get(DATABASE_STATUS_CODE.OK) as string,
//         result: true,
//       };
//       res.status(HTTP_STATUS_CODE.CREATED).json(result);
//     } catch (error) {
//       next(new HttpException(HTTP_STATUS_CODE.ACCEPTED, error as string));
//     }
//   };

//   deletePolicy = async (
//     req: Request,
//     res: Response<ResponseDelete>,
//     next: NextFunction
//   ) => {
//     try {
//       const reqParam: RequestDeletePolicy = {
//         policy_key: Number(req.query.policy_key),
//       };
//       const isExtend: boolean = await deletePolicyService(reqParam);

//       const result: ResponseDelete = {
//         result: isExtend,
//         message: databaseMsg.get(DATABASE_STATUS_CODE.OK) as string,
//       };
//       res.status(HTTP_STATUS_CODE.OK).json(result);
//     } catch (error) {
//       next(new HttpException(HTTP_STATUS_CODE.ACCEPTED, error as string));
//     }
//   };

//   updatePolicy = async (
//     req: Request,
//     res: Response<ResponsePut>,
//     next: NextFunction
//   ) => {
//     try {
//       const reqParam: RequestPutPolicy = {
//         policy_key: Number(req.params.policy_key),
//         protocol_type: req.query.protocol_type as string,
//         name: req.query.name as string,
//       };
//       const isExtend: boolean = await updatePolicyService(reqParam);

//       const result: ResponsePut = {
//         result: isExtend,
//         message: databaseMsg.get(DATABASE_STATUS_CODE.OK) as string,
//       };
//       res.status(HTTP_STATUS_CODE.OK).json(result);
//     } catch (error) {
//       next(new HttpException(HTTP_STATUS_CODE.ACCEPTED, error as string));
//     }
//   };
// }
