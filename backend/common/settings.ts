export const settings = {
  port: process.env.PORT || 3000,
  database: {
    connection: {
      dbpath: "database/example.db",
    },
    buildNumber: "1",
  },
  workingfolder: {
    log: "log",
  },
};
