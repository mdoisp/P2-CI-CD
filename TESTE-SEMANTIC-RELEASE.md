# Teste do Semantic Release - Configuração Mais Básica

## ✅ Configuração Final

Agora o semantic-release está configurado da forma mais básica possível:

### 1. package.json
```json
{
  "release": {
    "branches": ["main"]
  }
}
```

### 2. Workflow (.github/workflows/ci-cd.yml)
```yaml
- name: Semantic Release
  if: github.ref == 'refs/heads/main'
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  run: npx semantic-release

- name: Get version
  id: get_version
  run: |
    VERSION=$(node -p "require('./package.json').version")
    echo "version=$VERSION" >> $GITHUB_OUTPUT

- name: Build and push Docker image
  uses: docker/build-push-action@v5
  with:
    tags: |
      ${{ env.IMAGE_NAME }}:latest
      ${{ env.IMAGE_NAME }}:${{ steps.get_version.outputs.version }}
```

### 3. Dependências
- Apenas `semantic-release` no devDependencies

## 🚀 Como Testar

### Passo 1: Fazer um commit com mensagem convencional
```bash
git add .
git commit -m "feat: implementa semantic release básico"
```

### Passo 2: Push para main
```bash
git push origin main
```

### Passo 3: Verificar se funcionou
- ✅ Nova tag criada (ex: v1.1.0)
- ✅ Nova release no GitHub
- ✅ package.json com versão incrementada
- ✅ Docker Hub com tags: `latest` e `1.1.0`

## 🐳 Tags do Docker Hub

### Tags Geradas:
- **`latest`** - Versão mais recente
- **`1.1.0`** - Versão exata (sem o 'v')

### Exemplo:
Se o semantic-release gerar a versão `1.1.0`, as tags do Docker serão:
- `seu-usuario/p2-api:latest`
- `seu-usuario/p2-api:1.1.0`

## 📝 Mensagens de Commit Válidas

```bash
# ✅ Válidas
git commit -m "feat: adiciona nova funcionalidade"
git commit -m "fix: corrige bug na autenticação"
git commit -m "docs: atualiza documentação"
git commit -m "chore: atualiza dependências"

# ❌ Inválidas
git commit -m "adiciona funcionalidade"
git commit -m "corrige bug"
git commit -m "update"
```

## 🔧 O que Mudou

### ❌ Removido:
- Job de release separado
- Configurações complexas
- Plugins extras
- Arquivos de configuração extras
- Tags complexas do Docker

### ✅ Mantido:
- Semantic release integrado no job de build
- Configuração mínima no package.json
- Apenas permissões essenciais
- Workflow simplificado
- Tags simples do Docker (latest + versão)

## 🎯 Fluxo Atual

1. **Push na main** → Semantic release roda
2. **Cria tag Git** → Automaticamente (ex: v1.1.0)
3. **Cria release** → Automaticamente no GitHub
4. **Build Docker** → Com tags: latest e 1.1.0
5. **Deploy Render** → Automaticamente

## 🎉 Resultado Esperado

Agora deve funcionar sem erros, igual ao que seu amigo tem!

- ✅ **Tags Git**: v1.1.0
- ✅ **Tags Docker**: latest, 1.1.0
- ✅ **Release GitHub**: Automática
- ✅ **Deploy Render**: Automático

Faça o teste e veja funcionando! 🚀 