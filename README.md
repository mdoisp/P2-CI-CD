# P2 - API REST com CI/CD

API REST para integração e entrega contínua (P2) com deploy automatizado no Render, Docker Hub e logs estruturados no BetterStack.

## 🚀 Como Funciona

1. **Push na main** → Detecta tipo de commit e incrementa versão
2. **Versão incrementada** → Atualiza package.json automaticamente
3. **Tag criada** → v1.0.1, v1.1.0, v2.0.0 (baseado no tipo de commit)
4. **Build Docker** → Com a tag exata
5. **Push Docker Hub** → Com a tag exata
6. **Deploy Render** → Automaticamente

## 📝 Versionamento Semântico

### Tipos de Commit:
- **`feat:`** → Incrementa minor version (1.0.0 → 1.1.0)
- **`fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `chore:`** → Incrementa patch version (1.0.0 → 1.0.1)
- **`BREAKING CHANGE:`** → Incrementa major version (1.0.0 → 2.0.0)

### Exemplos:
```bash
git commit -m "feat: adiciona autenticação"
git push origin main
# Resultado: 1.0.0 → 1.1.0

git commit -m "fix: corrige bug no login"
git push origin main
# Resultado: 1.1.0 → 1.1.1

git commit -m "BREAKING CHANGE: remove endpoint antigo"
git push origin main
# Resultado: 1.1.1 → 2.0.0
```

## 🔧 Configuração

### Secrets Necessários:
- `DOCKERHUB_USERNAME`: Seu usuário do Docker Hub
- `DOCKERHUB_TOKEN`: Token de acesso do Docker Hub
- `RENDER_TOKEN`: Token de API do Render
- `RENDER_SERVICE_ID`: ID do serviço no Render
- `BETTERSTACK_URL`: URL de ingestão do BetterStack
- `BETTERSTACK_TOKEN`: Token de autenticação do BetterStack

### Como configurar o BetterStack:
1. Acesse [BetterStack](https://betterstack.com)
2. Crie uma nova fonte de logs
3. Copie a URL de ingestão para `BETTERSTACK_URL`
4. Copie o token de autenticação para `BETTERSTACK_TOKEN`

## 📊 Endpoints

- `GET /` - Status da API
- `GET /health` - Health check
- `GET /api-docs` - Documentação Swagger
- `GET /users` - Listar usuários
- `POST /users` - Criar usuário

## 🎯 Tecnologias

- **Backend**: Node.js + Express
- **Banco**: PostgreSQL (Render)
- **Logs**: BetterStack + Winston
- **CI/CD**: GitHub Actions
- **Deploy**: Render
- **Container**: Docker 