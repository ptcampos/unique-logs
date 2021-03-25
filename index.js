const moment = require('moment');
const fs = require('fs');

const ACCEPTABLE_TYPES = ['file', 'db'];

/**
 * @description handle app logger. Only works with file logs and mongo DB logs
 */
class UniqueLogs {
  #type;
  #logPath;
  #connectionString;

  /**
   * @description construct logger instance with type and path in case of file.
   * @param {*} param0
   */
  constructor(config) {
    if (!config) {
      throw new Error('Configs are empty');
    }
    const {
      type, // file or db
      logPath,
      connectionString,
    } = config;
    if (!type) {
      throw new Error('Log type is required');
    }
    if (!ACCEPTABLE_TYPES.includes(type)) {
      throw new Error('Log type is not accepted');
    }
    if (type === 'file' && !logPath) {
      throw new Error('Log path is required for type file');
    }
    if (type === 'db' && !connectionString) {
      throw new Error('Connection string is required');
    }

    this.#type = type;
    this.#logPath = logPath;
    this.#connectionString = connectionString;
  }

  fileLog({ message }) {
    if (!this.#logPath) {
      throw new Error('You need to create instance with logPath');
    }
    if (this.#type !== 'file') {
      throw new Error('The current log type is not file');
    }
    fs.appendFileSync(this.#logPath, `\n${moment().format('YYYYMMDDHHmm')} - ${message}`);
  }
}

module.exports = UniqueLogs;
