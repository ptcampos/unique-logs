const UniqueLogs = require('./index');

const logger = new UniqueLogs({
  type: 'file', // or DB
  logPath: 'example.log', // required id file type
  // connectionString: '123456', // required if DB type
});

logger.fileLog({ message: 'This is a test log message' });
