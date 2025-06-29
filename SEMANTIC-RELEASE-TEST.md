# Teste do Semantic Release

## Configuração Simplificada

Agora o semantic-release está configurado de forma mais simples, similar ao que seu amigo fez:

### 1. Configuração Mínima (.releaserc.json)
```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/github",
    "@semantic-release/git"
  ]
}
```

### 2. Workflow Simplificado
- Removidas configurações complexas do Git
- Removido NPM_TOKEN (não necessário se não publicar no npm)
- Mantidas apenas as permissões essenciais

### 3. Como Testar

#### Passo 1: Fazer um commit com mensagem convencional
```bash
git add .
git commit -m "feat: adiciona funcionalidade de teste"
```

#### Passo 2: Push para main ou merge de PR
```bash
git push origin main
# ou
# Fazer merge de um PR para main
```

#### Passo 3: Verificar se funcionou
- ✅ Nova tag criada (ex: v1.1.0)
- ✅ Nova release no GitHub
- ✅ CHANGELOG.md atualizado
- ✅ package.json com versão incrementada

### 4. Troubleshooting

Se ainda der erro, verifique:

1. **Permissões do repositório**:
   - Settings > Actions > General
   - "Workflow permissions" = "Read and write permissions"

2. **Se há commits com mensagens convencionais**:
   - `feat:` - nova funcionalidade
   - `fix:` - correção de bug
   - `docs:` - documentação
   - etc.

3. **Se o workflow está rodando na main**:
   - Só roda na branch main
   - Só roda após merge (não em PRs abertos)

### 5. Diferenças da Configuração Anterior

#### ❌ Antes (Complexo):
- Configuração duplicada (package.json + .releaserc.json)
- Configurações Git manuais
- NPM_TOKEN desnecessário
- Release rules complexas
- Tag format customizado

#### ✅ Agora (Simples):
- Configuração única no .releaserc.json
- Configuração Git automática
- Apenas GITHUB_TOKEN
- Configuração padrão do semantic-release
- Tag format padrão

### 6. Próximos Passos

1. Faça um commit de teste
2. Push para main
3. Verifique se a tag foi criada
4. Se funcionar, o problema estava na configuração complexa

Esta configuração mais simples deve funcionar como a do seu amigo! 🚀 