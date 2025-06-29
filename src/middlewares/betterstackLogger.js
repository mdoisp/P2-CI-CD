const winston = require('winston');
const axios = require('axios');

const betterStackUrl = process.env.BETTERSTACK_URL;

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
    logger.warn('BETTERSTACK_URL não configurada');
    return;
  }
  
  try {
    const enhancedLog = {
      ...log,
      service: 'p2-api',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
    };

    await axios.post(betterStackUrl, enhancedLog, {
      headers: { 
        'Content-Type': 'application/json',
        'User-Agent': 'P2-API-Logger/1.0'
      },
      timeout: 5000, // 5 segundos de timeout
    });
  } catch (err) {
    logger.error('Erro ao enviar log para Better Stack:', {
      error: err.message,
      status: err.response?.status,
      data: err.response?.data
    });
  }
}

// Middleware para logar requisições
const betterstackLogger = (req, res, next) => {
  const start = Date.now();
  
  // Log da requisição recebida
  logger.info('Requisição recebida', {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });

  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      contentLength: res.get('Content-Length'),
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      requestId: req.headers['x-request-id'] || 'unknown'
    };

    // Log local
    if (res.statusCode >= 400) {
      logger.error('Requisição com erro', log);
    } else {
      logger.info('Requisição processada', log);
    }

    // Enviar para Better Stack
    sendToBetterStack(log);
  });

  next();
};

// Função para log de erros da aplicação
const logError = (error, req = null) => {
  const errorLog = {
    level: 'error',
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    service: 'p2-api',
    environment: process.env.NODE_ENV || 'development'
  };

  if (req) {
    errorLog.request = {
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    };
  }

  logger.error(errorLog);
  sendToBetterStack(errorLog);
};

module.exports = { betterstackLogger, logError, logger }; 