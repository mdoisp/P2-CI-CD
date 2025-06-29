# Multi-stage build para otimização
FROM node:18-alpine AS builder

# Diretório de trabalho
WORKDIR /usr/src/app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Stage de produção
FROM node:18-alpine AS production

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Diretório de trabalho
WORKDIR /usr/src/app

# Copiar dependências do stage anterior
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copiar o código da aplicação
COPY --chown=nodejs:nodejs . .

# Mudar para usuário não-root
USER nodejs

# Expor a porta
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Comando para iniciar a API
CMD ["npm", "start"]

