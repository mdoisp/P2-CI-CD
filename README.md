# P2 - API REST com CI/CD

API REST para integração e entrega contínua (P2) com deploy automatizado no Render, Docker Hub e logs estruturados no BetterStack.

## 🚀 Como Funciona

1. **Push na main** → Deploy automático
2. **Build Docker** → Com tag baseada no commit
3. **Push Docker Hub** → Com tag única
4. **Deploy Render** → Automaticamente

## 📝 Exemplo de Uso

```bash
git add .
git commit -m "adiciona nova funcionalidade"
git push origin main
# Resultado: Deploy automático com tag v1.0.0-abc1234
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