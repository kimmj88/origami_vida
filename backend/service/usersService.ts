import { excuteTransaction, TRANSACTION_TYPE } from "database/database";
import { Param, ConfigParam } from "common";
import { API_USER, SelectUser } from "class";

export function getUserService(reqParam: SelectUser): Promise<any> {
  return new Promise((resolve, reject) => {
    const queryString: Param = {
      user_key: reqParam.user_key.toString(),
    };
    const configParam: ConfigParam = { reqQeruy: queryString };
    resolve(excuteTransaction(API_USER, configParam, TRANSACTION_TYPE.SELECT));
  });
}

// export function setPolicyService(reqParam: RequestPostPolicy): Promise<any> {
//   return new Promise((resolve, reject) => {
//     const queryString: Param = {
//       protocol_type: reqParam.protocol_type,
//       name: reqParam.name,
//     };
//     const configParam: ConfigParam = { reqQeruy: queryString };

//     excuteTransaction(API_POLICY, configParam, TRANSACTION_TYPE.INSERT)
//       .then((result) => {
//         resolve(result);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }

// export function deletePolicyService(
//   reqParam: RequestDeletePolicy
// ): Promise<any> {
//   return new Promise((resolve, reject) => {
//     const queryString: Param = {
//       policy_key: reqParam.policy_key.toString(),
//     };
//     const configParam: ConfigParam = { reqQeruy: queryString };

//     excuteTransaction(API_POLICY, configParam, TRANSACTION_TYPE.DELETE)
//       .then((result) => {
//         resolve(result);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }

// export function updatePolicyService(reqParam: RequestPutPolicy): Promise<any> {
//   return new Promise((resolve, reject) => {
//     const paramString: Param = {
//       policy_key: reqParam.policy_key?.toString() || '',
//     };

//     const queryString: Param = {
//       protocol_type: reqParam.protocol_type || '',
//       name: reqParam.name,
//     };
//     const configParam: ConfigParam = {
//       reqQeruy: queryString,
//       reqBody: paramString,
//     };

//     excuteTransaction(API_POLICY, configParam, TRANSACTION_TYPE.UPDATE)
//       .then((result) => {
//         resolve(result);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
