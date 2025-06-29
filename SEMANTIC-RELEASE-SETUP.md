# Configuração do Semantic Release

## Problema Resolvido

O erro que você estava enfrentando era relacionado às permissões do GitHub Actions para fazer push no repositório. O semantic-release precisa de permissões específicas para:

1. **Fazer push de tags** para o repositório
2. **Criar releases** no GitHub
3. **Criar issues** quando há falhas
4. **Fazer push de commits** com atualizações de versão

## Soluções Implementadas

### 1. Permissões no Workflow

Adicionei as seguintes permissões globais nos workflows:

```yaml
permissions:
  contents: write
  issues: write
  pull-requests: write
```

### 2. Configuração do Git

Configurei o Git para usar as credenciais corretas do GitHub Actions:

```yaml
- name: Configure Git
  run: |
    git config --global user.name 'github-actions[bot]'
    git config --global user.email 'github-actions[bot]@users.noreply.github.com'
```

### 3. Checkout com Token

Configurei o checkout para usar o token do GitHub:

```yaml
- name: Checkout
  uses: actions/checkout@v4
  with:
    fetch-depth: 0
    token: ${{ secrets.GITHUB_TOKEN }}
```

### 4. Configuração do Semantic Release

Atualizei o `.releaserc.json` para incluir:

```json
{
  "tagFormat": "v${version}",
  "repositoryUrl": "https://github.com/mdoisp/P2-CI-CD"
}
```

## Como Funciona Agora

1. **Push direto na main**: O semantic-release roda e cria uma nova versão
2. **Merge de PR para main**: O workflow `deploy-on-merge.yml` roda e cria uma nova versão
3. **Tags**: São criadas automaticamente no formato `v0.0.1`
4. **Releases**: São criadas automaticamente no GitHub
5. **Changelog**: É atualizado automaticamente

## Verificação

Para verificar se está funcionando:

1. Faça um commit com uma mensagem que siga o padrão conventional commits:
   ```bash
   git commit -m "feat: adiciona nova funcionalidade"
   ```

2. Faça push para a branch main ou merge um PR

3. Verifique se:
   - Uma nova tag foi criada no repositório
   - Uma nova release foi criada no GitHub
   - O CHANGELOG.md foi atualizado
   - A versão no package.json foi incrementada

## Troubleshooting

Se ainda houver problemas:

1. **Verifique as permissões do repositório**:
   - Vá em Settings > Actions > General
   - Certifique-se que "Workflow permissions" está configurado para "Read and write permissions"

2. **Verifique os secrets**:
   - `GITHUB_TOKEN` é fornecido automaticamente
   - `NPM_TOKEN` é opcional (só necessário se você publicar no npm)

3. **Verifique os logs**:
   - Os logs do semantic-release mostrarão exatamente onde está falhando

## Fluxo Git Flow

Com essas configurações, o fluxo Git Flow funciona perfeitamente:

1. **Feature branches** → PR para `development`
2. **Development** → PR para `main`
3. **Main** → Deploy automático + Release semântico
4. **Hotfix** → PR direto para `main`

O semantic-release só roda na branch `main`, garantindo que apenas releases estáveis sejam criadas. 