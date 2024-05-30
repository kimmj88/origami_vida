const pragmaOptionFK = "PRAGMA foreign_keys = ON;";
const pragmaOptionNM = "PRAGMA synchronous = NORMAL";
const pragmaOptionJM = "PRAGMA  journal_mode = DELETE";

const versionSchema = `
    CREATE TABLE version
    (
      version_key INTEGER PRIMARY KEY AUTOINCREMENT,
      version TEXT NOT NULL,
      release_dttm TEXT NOT NULL,
      install_dttm TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      build_number INTEGER NOT NULL
    );`;

const policySchema = `
    CREATE TABLE IF NOT EXISTS users
    (
      user_key INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      user_password TEXT NOT NULL
    );
    `;

export const schemaList: string[] = [
  pragmaOptionFK,
  pragmaOptionNM,
  pragmaOptionJM,
  versionSchema,
  policySchema,
];
