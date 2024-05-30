const version_number = 2;

//Insert BN2 Version
const versionPrevalue = `INSERT INTO version(version, release_dttm, build_number) VALUES('AUTOCRYPT PolicyGenerator Database 1.0.0', '2024/05/09 12:00:00', ${version_number});`;

const alterTableMsgrulevalue_message_name = `ALTER TABLE messagerulevalue
RENAME COLUMN msg_name TO message_name;`;

const alterTableMsgrulevalue_creationdttm = `ALTER TABLE messagerulevalue
ADD COLUMN creation_dttm TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP;`;

export const BN2_schemaList: string[] = [
  versionPrevalue,
  alterTableMsgrulevalue_creationdttm,
];
