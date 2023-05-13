const http = require('http')
const logger= require('./logger')(module);

const data = {language:'js', isFun: true};

//?info
logger.info('this is first info.',data);
logger.info('this is second info.');

//?warn
logger.warn('this is first warn.');
logger.warn('this is second warn.');

//?debug
logger.debug('this is first debug.');
logger.debug('this is second debug.');

//?error
logger.error('this is an error message.');

http.createServer((req,res)=>{
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Winston Log!');
    res.end();
  }).listen(8090);