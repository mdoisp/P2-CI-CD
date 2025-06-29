const winston = require('winston');
const axios = require('axios');

const betterStackUrl = process.env.BETTERSTACK_URL;
const betterStackToken = process.env.BETTERSTACK_TOKEN;

// Configuração do logger Winston
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ],
});

// Função para enviar log para o Better Stack
async function sendToBetterStack(log) {
  if (!betterStackUrl) {
    logger.warn('BETTERSTACK_URL não configurada - logs não serão enviados');
    return;
  }
  
  if (!betterStackToken) {
    logger.warn('BETTERSTACK_TOKEN não configurado - logs não serão enviados');
    return;
  }
  
  try {
    const enhancedLog = {
      ...log,
      service: 'p2-api',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      hostname: require('os').hostname(),
      pid: process.pid
    };

    await axios.post(betterStackUrl, enhancedLog, {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${betterStackToken}`,
        'User-Agent': 'P2-API-Logger/1.0'
      },
      timeout: 5000, // 5 segundos de timeout
    });
  } catch (err) {
    // Não logar erro de envio para evitar loop infinito
    console.error('Erro ao enviar log para Better Stack:', {
      error: err.message,
      status: err.response?.status,
      data: err.response?.data
    });
  }
}

// Middleware para logar requisições
const betterstackLogger = (req, res, next) => {
  const start = Date.now();
  const requestId = req.headers['x-request-id'] || `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Adicionar request ID ao objeto req
  req.requestId = requestId;
  
  // Log da requisição recebida
  const requestLog = {
    type: 'request_start',
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    requestId: requestId,
    timestamp: new Date().toISOString()
  };

  logger.info('Requisição recebida', requestLog);
  sendToBetterStack(requestLog);

  res.on('finish', () => {
    const duration = Date.now() - start;
    const responseLog = {
      type: 'request_end',
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      durationMs: duration,
      contentLength: res.get('Content-Length'),
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      requestId: requestId,
      timestamp: new Date().toISOString()
    };

    // Log local
    if (res.statusCode >= 400) {
      logger.error('Requisição com erro', responseLog);
    } else {
      logger.info('Requisição processada', responseLog);
    }

    // Enviar para Better Stack
    sendToBetterStack(responseLog);
  });

  next();
};

// Função para log de erros da aplicação
const logError = (error, req = null) => {
  const errorLog = {
    type: 'error',
    level: 'error',
    message: error.message,
    stack: error.stack,
    name: error.name,
    code: error.code,
    timestamp: new Date().toISOString(),
    service: 'p2-api',
    environment: process.env.NODE_ENV || 'development',
    requestId: req?.requestId || 'unknown'
  };

  if (req) {
    errorLog.request = {
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      headers: {
        'content-type': req.get('Content-Type'),
        'authorization': req.get('Authorization') ? '[REDACTED]' : undefined
      }
    };
  }

  logger.error(errorLog);
  sendToBetterStack(errorLog);
};

// Função para log de informações da aplicação
const logInfo = (message, data = {}) => {
  const infoLog = {
    type: 'info',
    level: 'info',
    message,
    ...data,
    timestamp: new Date().toISOString(),
    service: 'p2-api',
    environment: process.env.NODE_ENV || 'development'
  };

  logger.info(infoLog);
  sendToBetterStack(infoLog);
};

// Função para log de warnings
const logWarning = (message, data = {}) => {
  const warningLog = {
    type: 'warning',
    level: 'warn',
    message,
    ...data,
    timestamp: new Date().toISOString(),
    service: 'p2-api',
    environment: process.env.NODE_ENV || 'development'
  };

  logger.warn(warningLog);
  sendToBetterStack(warningLog);
};

module.exports = { 
  betterstackLogger, 
  logError, 
  logInfo, 
  logWarning, 
  logger,
  sendToBetterStack 
}; 