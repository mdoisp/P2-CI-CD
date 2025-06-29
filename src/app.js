// Importações principais
const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
require('dotenv').config();
const { betterstackLogger, logError, logInfo, logWarning, logger } = require('./middlewares/betterstackLogger');

// Inicialização do app
const app = express();
const PORT = process.env.PORT || 3000;

// Banco de dados
const sequelize = require('./config/database');
const { User } = require('./models/user');

// Middlewares
app.use(express.json());
app.use(morgan('combined'));
app.use(betterstackLogger);

// Adicionar request ID para rastreamento
app.use((req, res, next) => {
  req.headers['x-request-id'] = req.headers['x-request-id'] || `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  res.setHeader('X-Request-ID', req.headers['x-request-id']);
  next();
});

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Sincronizar banco ao iniciar (apenas se não estiver em teste)
if (process.env.NODE_ENV !== 'test') {
  sequelize.sync()
    .then(() => {
      logInfo('Banco de dados sincronizado com sucesso', {
        database: process.env.DB_NAME || 'unknown',
        host: process.env.DB_HOST || 'localhost'
      });
    })
    .catch(err => {
      logError(err);
      logger.error('Erro ao sincronizar banco:', err.message);
    });
}

// Rotas de usuários
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// Rota de teste
app.get('/', (req, res) => {
  logInfo('Acesso à rota raiz', {
    requestId: req.requestId,
    userAgent: req.get('User-Agent')
  });
  
  res.json({ 
    message: 'API rodando com sucesso!',
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    requestId: req.requestId
  });
});

// Rota de health check
app.get('/health', (req, res) => {
  logInfo('Health check realizado', {
    requestId: req.requestId,
    uptime: process.uptime()
  });
  
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    requestId: req.requestId
  });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  logError(err, req);
  
  res.status(err.status || 500).json({
    error: {
      message: process.env.NODE_ENV === 'production' ? 'Erro interno do servidor' : err.message,
      status: err.status || 500,
      timestamp: new Date().toISOString(),
      requestId: req.requestId
    }
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  logWarning('Rota não encontrada', {
    method: req.method,
    url: req.originalUrl,
    requestId: req.requestId,
    ip: req.ip
  });
  
  res.status(404).json({
    error: {
      message: 'Rota não encontrada',
      status: 404,
      timestamp: new Date().toISOString(),
      requestId: req.requestId
    }
  });
});

// Inicialização do servidor (apenas se não estiver em teste)
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    logInfo('Servidor iniciado com sucesso', {
      port: PORT,
      environment: process.env.NODE_ENV || 'development',
      nodeVersion: process.version,
      betterstackConfigured: !!process.env.BETTERSTACK_URL
    });
  });

  // Tratamento de erros não capturados
  process.on('uncaughtException', (err) => {
    logError(err);
    logger.error('Erro não capturado:', err);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    const error = new Error(`Promise rejeitada: ${reason}`);
    logError(error);
    logger.error('Promise rejeitada não tratada:', reason);
  });

  // Log de shutdown graceful
  process.on('SIGTERM', () => {
    logInfo('Sinal SIGTERM recebido, iniciando shutdown graceful');
    process.exit(0);
  });

  process.on('SIGINT', () => {
    logInfo('Sinal SIGINT recebido, iniciando shutdown graceful');
    process.exit(0);
  });
}

module.exports = app;
