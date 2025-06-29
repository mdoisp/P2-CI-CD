# P2 - API REST com CI/CD

API REST para integração e entrega contínua (P2) com deploy automatizado no Render, Docker Hub e logs estruturados no BetterStack.

## 🚀 Como Funciona

1. **Push na main** → Semantic Release cria tag automaticamente
2. **Tag criada** → Deploy Produção roda automaticamente
3. **Build Docker** → Com a tag exata
4. **Push Docker Hub** → Com a tag exata
5. **Deploy Render** → Automaticamente

## 📝 Exemplo de Uso

```bash
git add .
git commit -m "feat: nova funcionalidade"
git push origin main
```

## 🔧 Configuração

### Secrets Necessários:
- `DOCKERHUB_USERNAME`: Seu usuário do Docker Hub
- `DOCKERHUB_TOKEN`: Token de acesso do Docker Hub
- `RENDER_TOKEN`: Token de API do Render
- `RENDER_SERVICE_ID`: ID do serviço no Render
- `BETTERSTACK_URL`: URL de ingestão do BetterStack

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
- **Versionamento**: Semantic Release 