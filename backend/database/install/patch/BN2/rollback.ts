//Insert BN2 Version

const alterTableMsgrulevalue_message_name = `ALTER TABLE messagerulevalue
RENAME COLUMN message_name TO msg_name;`;

const alterTableMsgrulevalue_creationdttm = `ALTER TABLE messagerulevalue
DROP COLUMN creation_dttm;`;

export const BN2_RB_schemaList: string[] = [
  `DELETE FROM version WHERE build_number = 2`,
  alterTableMsgrulevalue_message_name,
  alterTableMsgrulevalue_creationdttm,
];
