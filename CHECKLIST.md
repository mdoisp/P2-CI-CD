# Checklist de Configuração

## ✅ BetterStack
- [ ] Criar conta no BetterStack
- [ ] Criar source HTTP para logs
- [ ] Copiar URL de ingestão
- [ ] Atualizar BETTERSTACK_URL no .env
- [ ] Testar logs localmente

## ✅ Render
- [ ] Criar conta no Render
- [ ] Criar banco PostgreSQL
- [ ] Anotar credenciais do banco
- [ ] Criar serviço Web
- [ ] Conectar com repositório GitHub
- [ ] Configurar variáveis de ambiente
- [ ] Obter Service ID
- [ ] Obter URL do serviço
- [ ] Criar API Token

## ✅ Docker Hub
- [ ] Criar conta no Docker Hub
- [ ] Criar repositório p2-api
- [ ] Gerar Access Token
- [ ] Anotar username e token

## ✅ GitHub Secrets
- [ ] DOCKERHUB_USERNAME
- [ ] DOCKERHUB_TOKEN
- [ ] RENDER_TOKEN
- [ ] RENDER_SERVICE_ID
- [ ] RENDER_URL
- [ ] EMAIL_SERVER (opcional)
- [ ] EMAIL_PORT (opcional)
- [ ] EMAIL_USER (opcional)
- [ ] EMAIL_PASS (opcional)
- [ ] EMAIL_TO (opcional)

## ✅ Teste Final
- [ ] Push para branch main
- [ ] Verificar workflow GitHub Actions
- [ ] Verificar build no Docker Hub
- [ ] Verificar deploy no Render
- [ ] Testar endpoint /health
- [ ] Verificar logs no BetterStack
- [ ] Testar CRUD de usuários

## 📝 Notas Importantes

### URLs de Teste:
- API: `https://<seu-servico>.onrender.com`
- Health: `https://<seu-servico>.onrender.com/health`
- Swagger: `https://<seu-servico>.onrender.com/api-docs`

### Comandos Úteis:
```bash
# Testar localmente
npm run dev

# Build Docker local
docker build -t matpp/p2-api .

# Testar Docker local
docker run -p 3000:3000 matpp/p2-api

# Ver logs
docker logs <container-id>
``` 