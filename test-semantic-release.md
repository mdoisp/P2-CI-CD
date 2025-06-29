# Teste do Semantic Release - Debug

## Problema Identificado

O erro indica que o semantic-release não está conseguindo identificar a branch correta. Vamos resolver isso:

### 1. Verificar qual é a branch principal

O erro mostra que o semantic-release está recebendo uma lista vazia de branches `[]`. Isso pode acontecer se:

- A branch se chama `master` em vez de `main`
- O semantic-release não está conseguindo detectar a branch atual
- Há um problema na configuração

### 2. Configuração Atualizada

Agora o `.releaserc.json` está configurado para aceitar tanto `main` quanto `master`:

```json
{
  "branches": ["main", "master"],
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

### 3. Debug Adicionado

Adicionei um passo de debug nos workflows que vai mostrar:
- Qual branch está sendo executada
- Qual é o ref completo
- Quais branches existem no repositório

### 4. Como Testar

1. **Faça um commit com mensagem convencional**:
   ```bash
   git add .
   git commit -m "feat: adiciona debug para semantic release"
   git push origin main  # ou master, dependendo da sua branch principal
   ```

2. **Verifique os logs do GitHub Actions**:
   - Procure pelo passo "Debug branch info"
   - Veja qual branch está sendo detectada
   - Verifique se o semantic-release roda

### 5. Possíveis Soluções

#### Se a branch for `master`:
- A configuração atual já suporta
- O workflow já está configurado

#### Se a branch for `main`:
- A configuração atual já suporta
- O workflow já está configurado

#### Se ainda der erro:
- Verifique se há commits com mensagens convencionais
- Verifique se o repositório tem permissões corretas
- Verifique se o GITHUB_TOKEN está sendo passado corretamente

### 6. Mensagens de Commit Válidas

Para o semantic-release funcionar, você precisa de commits com mensagens convencionais:

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

### 7. Próximos Passos

1. Faça um commit de teste com mensagem convencional
2. Push para a branch principal
3. Verifique os logs do GitHub Actions
4. Se ainda der erro, verifique o output do debug

O debug vai nos mostrar exatamente qual é o problema! 🔍 