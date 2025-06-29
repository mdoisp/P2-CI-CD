# Semantic Release - Implementação Mais Simples

## ✅ Implementação Simplificada

Agora o semantic-release está configurado da forma mais simples possível, como seu amigo fez:

### 1. Configuração Mínima (package.json)
```json
{
  "release": {
    "branches": ["main"]
  }
}
```

### 2. Workflow Simplificado
```yaml
- name: Release
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  run: npx semantic-release
```

### 3. Dependências Mínimas
- Apenas `semantic-release` no devDependencies
- Sem plugins extras
- Sem configurações complexas

## 🚀 Como Funciona

1. **Push na main** → Semantic release roda automaticamente
2. **Cria tag** → Automaticamente no formato v1.0.0
3. **Cria release** → Automaticamente no GitHub
4. **Atualiza package.json** → Versão incrementada

## 📝 Como Usar

### Fazer um commit com mensagem convencional:
```bash
git add .
git commit -m "feat: adiciona nova funcionalidade"
git push origin main
```

### Tipos de commit válidos:
- `feat:` - Nova funcionalidade (minor)
- `fix:` - Correção de bug (patch)
- `docs:` - Documentação (patch)
- `style:` - Formatação (patch)
- `refactor:` - Refatoração (patch)
- `perf:` - Performance (patch)
- `test:` - Testes (patch)
- `chore:` - Manutenção (patch)
- `BREAKING CHANGE:` - Mudança incompatível (major)

## 🎯 Vantagens da Implementação Simples

- ✅ **Menos configuração** = Menos problemas
- ✅ **Padrão da indústria** = Funciona em qualquer lugar
- ✅ **Fácil de manter** = Sem complexidades desnecessárias
- ✅ **Funciona igual** = Mesmo resultado com menos código

## 🔧 O que Foi Removido

- ❌ Arquivo .releaserc.json
- ❌ Plugins extras (@semantic-release/changelog, etc.)
- ❌ Configurações complexas
- ❌ Workflow de deploy-on-merge
- ❌ Debug steps
- ❌ Notificações por email

## 🎉 Resultado

Agora você tem exatamente o que seu amigo tem: **semantic-release funcionando com configuração mínima!**

Faça um commit de teste e veja funcionando! 🚀 