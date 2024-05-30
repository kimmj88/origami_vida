import sqlite from "sqlite3";
import { logger } from "common";
import { schemaList } from "database/install/schema";
import { ConfigParam, settings } from "common";

export const dbpath = settings.database.connection.dbpath;
export const dbVersion = settings.database.buildNumber;

export const TRANSACTION_TYPE = {
  SELECT: 1,
  INSERT: 2,
  UPDATE: 3,
  DELETE: 4,
} as const;

export type TRANSACTION_TYPE =
  (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE];

export const database = new sqlite.Database(dbpath, (e) => {
  //ValidateDBVersion();
  createTable(schemaList);
});

export function createTable(TableschemaQuery: string[]) {
  TableschemaQuery.forEach((query) => {
    database.run(query, (err: Error) => {
      if (err) {
        logger.error(`excuting query ${err.message}`);
      }
    });
  });
}

export function excuteDynamic(
  query: string,
  condition?: string[],
  param?: ConfigParam
): Promise<any> {
  return new Promise((resolve, reject) => {
    let excuteQuery: string;
    if (condition === undefined || param === undefined) {
      excuteQuery = query;
    } else {
      excuteQuery = dynamicQuery(query, condition, param);
    }
    try {
      database.all(excuteQuery, function (err: Error, rows) {
        if (err) {
          return reject(err.message);
        }
        return resolve(rows);
      });
    } catch (err: any) {
      return reject(err);
    }
  });
}

export function excuteTransaction(
  table: string,
  param: ConfigParam,
  excuteType: TRANSACTION_TYPE
): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      if (excuteType == TRANSACTION_TYPE.SELECT) {
        database.all(
          generateQuery(table, param, excuteType),
          function (err: Error, rows) {
            if (err) {
              return reject(err.message);
            }
            return resolve(rows);
          }
        );
      } else {
        database.run(
          generateQuery(table, param, excuteType),
          function (err: any) {
            if (err) {
              return reject(err.message);
            }
            switch (excuteType) {
              case TRANSACTION_TYPE.INSERT:
                return resolve(this.lastID);
              case TRANSACTION_TYPE.UPDATE:
              case TRANSACTION_TYPE.DELETE:
                return resolve(true);
            }
          }
        );
      }
    } catch (err: any) {
      return reject(err);
    }
  });
}
export function dynamicQuery(
  baseQuery: string,
  condition: string[],
  params: ConfigParam
): string {
  let whereQuery: string = undefined || "";
  let resultQuery: string = undefined || "";

  for (const item of condition) {
    for (const key in params.reqQeruy) {
      if (
        params.reqQeruy[key] !== undefined &&
        params.reqQeruy[key] !== "" &&
        params.reqQeruy[key] !== "NaN"
      ) {
        const placeholder = `$${key}`;
        const paramValue = params.reqQeruy[key];
        if (item.indexOf(placeholder) != -1) {
          whereQuery += `${item.replace(placeholder, paramValue)} AND `;
          break;
        }
      }
    }
  }
  resultQuery = `${baseQuery} ${whereQuery}`;
  resultQuery = resultQuery.slice(0, -5);

  return resultQuery;
}

export function generateQuery(
  table: string,
  params: ConfigParam,
  tr_type: TRANSACTION_TYPE
): string {
  let baseQuery: string = undefined || "";
  let whereQuery: string = undefined || "";
  let valueQuery: string = undefined || "";
  let keyQuery: string = undefined || "";
  let resultQuery: string = undefined || "";

  //#region Generate Base Query
  switch (tr_type) {
    case TRANSACTION_TYPE.SELECT:
    case TRANSACTION_TYPE.DELETE:
      baseQuery =
        tr_type === TRANSACTION_TYPE.SELECT
          ? `SELECT * FROM ${table}`
          : `DELETE FROM ${table}`;
      break;
    case TRANSACTION_TYPE.INSERT:
      baseQuery = `INSERT INTO ${table}`;
      break;
    case TRANSACTION_TYPE.UPDATE:
      baseQuery = `UPDATE ${table} SET `;
      for (const key in params.reqBody) {
        if (
          params.reqBody[key] !== undefined &&
          params.reqBody[key] !== "" &&
          params.reqBody[key] !== "NaN"
        )
          whereQuery += `${key} = '${params.reqBody[key]}',`;
      }
      break;
  }
  //#endregion

  //#region Generate Where Query
  for (const key in params.reqQeruy) {
    if (
      params.reqQeruy[key] !== undefined &&
      params.reqQeruy[key] !== "" &&
      params.reqQeruy[key] !== "NaN"
    )
      switch (tr_type) {
        case TRANSACTION_TYPE.SELECT:
        case TRANSACTION_TYPE.DELETE:
          whereQuery += `${key} = '${params.reqQeruy[key]}' AND `;
          break;
        case TRANSACTION_TYPE.INSERT:
          keyQuery += `${key},`;
          valueQuery += `'${params.reqQeruy[key]}',`;
          break;
        case TRANSACTION_TYPE.UPDATE:
          valueQuery += `${key} = '${params.reqQeruy[key]}',`;
          break;
      }
  }
  //#endregion

  //#region Generate Combine Query
  switch (tr_type) {
    case TRANSACTION_TYPE.SELECT:
    case TRANSACTION_TYPE.DELETE:
      resultQuery =
        (whereQuery as string) == ""
          ? baseQuery
          : baseQuery + " WHERE " + whereQuery.slice(0, -5);
      break;
    case TRANSACTION_TYPE.INSERT:
      resultQuery =
        (keyQuery as string) == ""
          ? baseQuery
          : baseQuery +
            `(${keyQuery.slice(0, -1)})` +
            "VALUES" +
            `(${valueQuery.slice(0, -1)})`;
      break;
    case TRANSACTION_TYPE.UPDATE:
      resultQuery =
        baseQuery +
        `${valueQuery.slice(0, -1)}` +
        " WHERE " +
        `${whereQuery.slice(0, -1)}`;
      break;
  }
  //#endregion

  return resultQuery;
}

import {
  BN2_schemaList,
  BN3_schemaList,
  BN2_RB_schemaList,
} from "database/install/patch";

const patchList: any[] = [schemaList, BN2_schemaList, BN3_schemaList];
const RollBackList: any[] = [null, BN2_RB_schemaList];

function ValidateDBVersion(): Promise<any> {
  return new Promise((resolve, reject) => {
    database.get(
      "SELECT build_number FROM version ORDER BY 1 DESC",
      function (err: Error, row: any) {
        if (err) {
          return reject(`Error executing query:${err.message}`);
        } else {
          const target_version = Number(dbVersion);
          const current_version = Number(row.build_number);
          if (current_version < target_version) {
            for (let i = current_version; i < target_version; i++) {
              createTable(patchList[i]);
            }
          } else {
            for (let i = current_version; target_version < i; i--) {
              createTable(RollBackList[i - 1]);
            }
          }
          return resolve(true);
        }
      }
    );
  });
}
