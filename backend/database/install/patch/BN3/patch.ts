const version_number = 3;

//Insert BN3 Version
const versionPrevalue = `INSERT INTO version(version, release_dttm, build_number) VALUES('AUTOCRYPT PolicyGenerator Database 1.0.0', '2024/05/09 12:00:00', ${version_number});`;

const signalrulevalueSchema = `
    CREATE TABLE IF NOT EXISTS signalrulevalue(
      signalrulevalue_key INTEGER PRIMARY KEY,
      policy_key INTEGER NOT NULL,
      dbcref_key INTEGER NOT NULL,
      ruletype_key INTEGER NOT NULL,
      msgrule_id TEXT,
      signalrule_id TEXT NOT NULL,
      value TEXT NOT NULL,
      FOREIGN KEY(policy_key) REFERENCES policy(policy_key),
      FOREIGN KEY(dbcref_key) REFERENCES dbcref(dbcref_key),
      FOREIGN KEY(ruletype_key) REFERENCES ruletype(ruletype_key),
      UNIQUE(dbcref_key, ruletype_key, signalrule_id)
    );
    `;

export const BN3_schemaList: string[] = [
  signalrulevalueSchema,
  versionPrevalue,
];
