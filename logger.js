const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

//? create transport for all type of level
let createTransport = (level) => {
  console.log('level>>>>>>>>>>>>>>> ', level);
  return new DailyRotateFile({
    filename: `logs/${level}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: level
  });
}

//? config winston log
const warnLoggerBase = createLogger({
  level: 'warn',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }), // save callstack when happen error
    format.printf(({ level, message, stack }) => { //format of save data in log file
      return `${level}: ${message}\n${stack || ''}`;
    }),
    format.splat(),
    format.json()
  ),
  statusLevels: true,
  transports: [
    createTransport('warn')
  ],
  exitOnError: false
});

//?info
const infoLoggerBase = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }), // save callstack when happen error
    format.printf(({ level, message, stack }) => { //format of save data in log file
      return `${level}: ${message}\n${stack || ''}`;
    }),
    format.splat(),
    format.json()
  ),
  statusLevels: true,
  transports: [
    createTransport('info')
  ],
  exitOnError: false
});

//?debug
const debugLoggerBase = createLogger({
  level: 'debug',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }), // save callstack when happen error
    format.printf(({ level, message, stack }) => { //format of save data in log file
      return `${level}: ${message}\n${stack || ''}`;
    }),
    format.splat(),
    format.json()
  ),
  statusLevels: true,
  transports: [
    createTransport('debug')
  ],
  exitOnError: false
});

//?error
const errorLoggerBase = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }), // save callstack when happen error
    format.printf(({ level, message, stack }) => { //format of save data in log file
      return `${level}: ${message}\n${stack || ''}`;
    }),
    format.splat(),
    format.json()
  ),
  statusLevels: true,
  transports: [
    createTransport('error')
  ],
  exitOnError: false
});


//? in the development environment display the console message
if (process.env.NODE_ENV === 'development') {
  loggerBase.add(new transports.Console({
  	format: format.combine(
      format.timestamp({
        format: 'HH:mm:ss',
      }),
      format.colorize(),
      format.timestamp(),
      format.align(),
      format.printf(info => `${info.timestamp} (${info.level}): ${info.message} ${info.stack || ''}`),
    ),
    level: 'debug'
  })
  );
}


//? get the file name from the module for save in log file
const logger = (module) => {

  const setLogData = (message, vars) => {
    const pathfile = module.id
    const logResult = { message, pathfile };
    if (vars) {
      logResult.metadata = vars
    }
    return logResult;
  };

  return {
    //?information
    info: (message, vars) => {
      infoLoggerBase.info(setLogData(message, vars));
    },
    //?debug
    debug: (message, vars) => {
      debugLoggerBase.debug(setLogData(message, vars));
    },
    // //?error
    error: (message, vars) => {
      errorLoggerBase.error(setLogData(message, vars));
    },
    //?warning
    warn: (message, vars) => {
      warnLoggerBase.warn(setLogData(message, vars));
    }
  }
};

module.exports = logger;
