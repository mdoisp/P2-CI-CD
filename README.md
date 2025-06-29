# P2 - API REST com CI/CD

API REST para integração e entrega contínua (P2) com deploy automatizado no Render e logs no BetterStack.

## 🚀 Funcionalidades

- ✅ API REST com Express.js
- ✅ Banco de dados PostgreSQL (Render)
- ✅ Logs estruturados com BetterStack
- ✅ CI/CD automatizado com GitHub Actions
- ✅ Versionamento semântico com semantic-release
- ✅ Deploy automático no Render
- ✅ Imagem Docker otimizada
- ✅ Health checks e monitoramento

## 🏗️ Arquitetura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   GitHub Repo   │───▶│  GitHub Actions │───▶│   Docker Hub    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                       │
                                ▼                       ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │   Render.com    │    │  BetterStack    │
                       │   (Deploy)      │    │   (Logs)        │
                       └─────────────────┘    └─────────────────┘
```

## 📋 Pré-requisitos

- Node.js 18+
- Docker
- Conta no GitHub
- Conta no Docker Hub
- Conta no Render
- Conta no BetterStack

## 🛠️ Configuração Local

### 1. Clone o repositório
```bash
git clone <seu-repositorio>
cd P2-CI-CD
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

### 4. Execute localmente
```bash
npm run dev
```

## 🐳 Docker

### Build da imagem
```bash
docker build -t p2-api .
```

### Executar com Docker Compose
```bash
docker-compose up -d
```

## 🔧 Configuração do CI/CD

### 1. Secrets do GitHub

Configure os seguintes secrets no seu repositório GitHub:

- `DOCKERHUB_USERNAME`: Seu usuário do Docker Hub
- `DOCKERHUB_TOKEN`: Token de acesso do Docker Hub
- `RENDER_TOKEN`: Token de API do Render
- `RENDER_SERVICE_ID`: ID do serviço no Render
- `RENDER_URL`: URL do seu serviço no Render
- `NPM_TOKEN`: Token do NPM (opcional)
- `EMAIL_SERVER`: Servidor SMTP para notificações
- `EMAIL_PORT`: Porta SMTP
- `EMAIL_USER`: Usuário do email
- `EMAIL_PASS`: Senha do email
- `EMAIL_TO`: Email para notificações

### 2. Configuração do Render

1. Crie um novo serviço Web no Render
2. Conecte com seu repositório GitHub
3. Configure as variáveis de ambiente:
   - `NODE_ENV=production`
   - `PORT=3000`
   - `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASS` (do PostgreSQL do Render)
   - `BETTERSTACK_URL` (sua URL do BetterStack)

### 3. Configuração do BetterStack

1. Crie uma conta no BetterStack
2. Crie um novo source para logs
3. Copie a URL de ingestão
4. Configure a variável `BETTERSTACK_URL` no Render

## 📝 Versionamento Semântico

O projeto usa semantic-release para versionamento automático:

- **Major** (x.0.0): Mudanças incompatíveis com versões anteriores
- **Minor** (0.x.0): Novas funcionalidades compatíveis
- **Patch** (0.0.x): Correções de bugs compatíveis

### Tipos de commit:
- `feat:` - Nova funcionalidade (minor)
- `fix:` - Correção de bug (patch)
- `docs:` - Documentação (patch)
- `style:` - Formatação (patch)
- `refactor:` - Refatoração (patch)
- `perf:` - Melhoria de performance (patch)
- `test:` - Testes (patch)
- `chore:` - Tarefas de manutenção (patch)
- `BREAKING CHANGE:` - Mudança incompatível (major)

## 🔄 Workflow CI/CD

### **Git Flow + CI/CD - Fluxo Completo:**

#### **1. Feature Branch → Development**
```bash
git checkout -b feature/nova-funcionalidade
# ... fazer mudanças ...
git push origin feature/nova-funcionalidade
# Criar PR para development
```
- ✅ **Testes**: Executa testes automatizados
- ✅ **Build Docker**: Constrói imagem otimizada
- ✅ **Push Docker Hub**: Publica imagem com tag `pr-{número}`
- ✅ **Validação**: Verifica se tudo funciona
- ✅ **Merge**: Se passar, merge para development

#### **2. Development → Main**
```bash
# Criar PR de development para main
# → GitHub Actions roda novamente
# → Se passar → Merge para main
# → AUTOMATICAMENTE faz deploy no Render!
```
- ✅ **Testes**: Executa testes automatizados
- ✅ **Semantic Release**: Gera nova versão
- ✅ **Build Docker**: Constrói imagem otimizada
- ✅ **Push Docker Hub**: Publica com tags (latest, version, main)
- ✅ **Deploy Render**: Deploy automático via API
- ✅ **Health Check**: Verifica se o deploy foi bem-sucedido

### **Resumo do Comportamento:**

| Ação | Testes | Build Docker | Deploy Render | Semantic Release |
|------|--------|--------------|---------------|------------------|
| **PR → development** | ✅ | ✅ | ❌ | ❌ |
| **PR → main** | ✅ | ✅ | ✅ | ✅ |
| **Push direto development** | ✅ | ✅ | ❌ | ❌ |
| **Push direto main** | ✅ | ✅ | ✅ | ✅ |

### **Como saber se deu certo:**

1. **PR para development**: 
   - ✅ Testes passam
   - ✅ Imagem Docker é construída
   - ✅ Imagem é publicada no Docker Hub com tags:
     - `latest` - Versão mais recente
     - `v1.0.0` - Versão semântica
     - `pr-{número}` - Número do PR
     - `{commit-hash}` - Hash do commit

2. **PR para main (quando mergeado)**:
   - ✅ Testes passam
   - ✅ Semantic release gera nova versão
   - ✅ Imagem Docker é construída
   - ✅ Imagem é publicada no Docker Hub com tags:
     - `latest` - Versão mais recente
     - `v1.0.0` - Versão semântica
     - `main` - Branch principal
   - ✅ **Deploy automático no Render**
   - ✅ Health check confirma sucesso

### **Padrão de Tags Docker:**

| Tag | Descrição | Exemplo |
|-----|-----------|---------|
| `latest` | Versão mais recente | `matpp/p2-api:latest` |
| `v1.0.0` | Versão semântica | `matpp/p2-api:v1.0.0` |
| `main` | Branch principal | `matpp/p2-api:main` |
| `development` | Branch de desenvolvimento | `matpp/p2-api:development` |
| `pr-{número}` | Pull Request | `matpp/p2-api:pr-5` |
| `{commit-hash}` | Hash do commit | `matpp/p2-api:89596d5a` |

### **Fluxo Recomendado (Git Flow):**

```bash
# 1. Desenvolver em feature branch
git checkout -b feature/nova-funcionalidade
# ... fazer mudanças ...
git push origin feature/nova-funcionalidade

# 2. PR para development → Testa tudo (sem deploy)
# 3. Se PR passar → Merge para development
# 4. PR de development para main → Testa tudo + Deploy
# 5. Se PR passar → Merge para main → Deploy automático!
```

### **Vantagens do Git Flow + CI/CD:**

- 🔒 **Segurança**: Código só vai para produção após review
- 🧪 **Testes**: Cada PR é testado automaticamente
- 🚀 **Deploy Automático**: Sem intervenção manual
- 📊 **Visibilidade**: Você vê cada etapa no GitHub Actions
- 🔄 **Rollback**: Pode reverter facilmente se algo der errado

## 📊 Monitoramento

### Health Check
```
GET /health
```

### Logs
- Logs estruturados enviados para BetterStack
- Logs locais com Winston
- Request ID para rastreamento

### Métricas
- Tempo de resposta das requisições
- Status codes
- Erros e exceções
- Uptime da aplicação

## 🚀 Deploy

O deploy é totalmente automatizado:

1. Faça PR de development para main
2. Merge o PR quando os testes passarem
3. O GitHub Actions executa o pipeline completo
4. A imagem é publicada no Docker Hub
5. O Render faz deploy automaticamente
6. Health check confirma o sucesso

## 📁 Estrutura do Projeto

```
P2-CI-CD/
├── .github/workflows/    # GitHub Actions
│   ├── ci-cd.yml        # Pipeline principal
│   └── deploy-on-merge.yml  # Deploy após merge
├── src/
│   ├── app.js           # Aplicação principal
│   ├── config/          # Configurações
│   ├── controllers/     # Controladores
│   ├── middlewares/     # Middlewares
│   ├── models/          # Modelos
│   └── routes/          # Rotas
├── tests/
│   └── basic.test.js    # Testes básicos
├── Dockerfile           # Configuração Docker
├── docker-compose.yml   # Docker Compose
├── render.yaml          # Configuração Render
└── .releaserc.json      # Configuração semantic-release
```

## 🔍 Troubleshooting

### Problemas comuns:

1. **Erro de conexão com banco**
   - Verifique as variáveis de ambiente no Render
   - Confirme se o PostgreSQL está ativo

2. **Erro no deploy**
   - Verifique os logs do GitHub Actions
   - Confirme se todos os secrets estão configurados

3. **Logs não aparecem no BetterStack**
   - Verifique se a URL do BetterStack está correta
   - Confirme se o token tem permissões de ingestão

4. **Pipeline não roda em PRs**
   - Verifique se o PR está direcionado para `main` ou `development`
   - Confirme se os workflows estão habilitados no repositório

5. **Deploy não acontece após merge**
   - Verifique se o PR foi realmente mergeado (não apenas fechado)
   - Confirme se o workflow `deploy-on-merge.yml` está ativo

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique os logs do BetterStack
2. Consulte os logs do GitHub Actions
3. Verifique a documentação do Render

## 📄 Licença

Este projeto está sob a licença ISC.