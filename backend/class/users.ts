import { ResponseGet } from "common";
export const API_USER = "users";

export interface SelectUser {
  user_key: number;
}

export interface InsertUser {
  user_id: string;
  user_password: string;
}

export interface LoadUser extends ResponseGet {
  users: Users[];
}

interface UsersParam {
  user_key: number;
  user_id?: string;
  user_password?: string;
  creation_dttm?: string;
}

export class Users {
  user_key: number;
  user_id?: string;
  user_password?: string;
  creation_dttm?: string;

  constructor(option: UsersParam) {
    this.user_key = option?.user_key;
    this.user_id = option?.user_id;
    this.user_password = option?.user_password;
    this.creation_dttm = option?.creation_dttm;
  }
}
