# Guia de Configuração do Render

## 1. Dados do PostgreSQL

Após criar o banco PostgreSQL no Render, você receberá:

```
Host: <algo>.oregon-postgres.render.com
Port: 5432
Database: p2db
User: <usuario>
Password: <senha>
```

## 2. Dados do Serviço Web

Após criar o serviço web, você receberá:

```
Service ID: <id-do-servico>
URL: https://<nome-do-servico>.onrender.com
```

## 3. Token da API do Render

1. Vá em [render.com/account/api-keys](https://render.com/account/api-keys)
2. Clique em "New API Key"
3. Dê um nome como "P2-API-Deploy"
4. Copie o token gerado

## 4. Secrets para GitHub

Configure estes secrets no seu repositório GitHub:

### Secrets Obrigatórios:
- `DOCKERHUB_USERNAME`: matpp
- `DOCKERHUB_TOKEN`: [Criar em hub.docker.com/settings/security]
- `RENDER_TOKEN`: [Token da API do Render]
- `RENDER_SERVICE_ID`: [ID do serviço web]
- `RENDER_URL`: [URL do serviço web]

### Secrets Opcionais (para notificações):
- `EMAIL_SERVER`: smtp.gmail.com
- `EMAIL_PORT`: 587
- `EMAIL_USER`: seu-email@gmail.com
- `EMAIL_PASS`: senha-do-app
- `EMAIL_TO`: email-para-notificacoes

## 5. Como obter o Docker Hub Token

1. Acesse [hub.docker.com](https://hub.docker.com)
2. Faça login
3. Vá em "Account Settings" > "Security"
4. Clique em "New Access Token"
5. Dê um nome como "P2-API-GitHub"
6. Copie o token gerado

## 6. Teste da Configuração

Após configurar tudo:

1. Faça push para a branch main
2. Verifique o workflow no GitHub Actions
3. Acompanhe o deploy no Render
4. Teste a API: `https://<seu-servico>.onrender.com/health`
5. Verifique os logs no BetterStack 