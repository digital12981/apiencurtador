# Instruções para Deploy Manual no Heroku

Este guia oferece instruções passo a passo para fazer deploy manual deste projeto no Heroku, resolvendo o problema de detecção do buildpack.

## Preparação Inicial

1. Instale a [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Faça login no Heroku:
   ```
   heroku login
   ```

## SOLUÇÃO PARA O PROBLEMA DO BUILDPACK

O Heroku está erroneamente detectando o projeto como Python. Para resolver isso:

### Método 1: Comando Direto no Heroku Dashboard

1. Acesse o [Dashboard do Heroku](https://dashboard.heroku.com/)
2. Selecione seu aplicativo
3. Vá para a aba "Settings"
4. Em "Buildpacks", clique em "Clear all buildpacks"
5. Depois clique em "Add buildpack"
6. Selecione "nodejs" da lista e salve

### Método 2: Usando a CLI do Heroku

Execute estes comandos na ordem:

```bash
# Primeiro, limpe todos os buildpacks
heroku buildpacks:clear -a seu-nome-de-app-aqui

# Depois, defina explicitamente o buildpack Node.js
heroku buildpacks:set heroku/nodejs -a seu-nome-de-app-aqui

# Verifique se o buildpack foi definido corretamente
heroku buildpacks -a seu-nome-de-app-aqui
```

## Passo a Passo para o Deploy

### 1. Criar uma nova aplicação Heroku

```bash
heroku create seu-nome-de-app-aqui
```

### 2. Configurar o buildpack Node.js (como explicado acima)

### 3. Adicionar o banco de dados PostgreSQL

```bash
heroku addons:create heroku-postgresql:hobby-dev -a seu-nome-de-app-aqui
```

### 4. Configurar as variáveis de ambiente

```bash
heroku config:set NODE_ENV=production -a seu-nome-de-app-aqui
```

### 5. Fazer deploy via Git

```bash
# Conecte sua pasta local ao repositório Heroku
heroku git:remote -a seu-nome-de-app-aqui

# Envie seu código para o Heroku
git push heroku main
```

Se o comando acima falhar, tente com `master` em vez de `main`:

```bash
git push heroku master
```

## Método Alternativo: Deploy via Heroku CLI

Se você ainda enfrentar problemas, use o método de deploy direto:

```bash
# Instale o plugin necessário
heroku plugins:install heroku-builds

# Faça o deploy direto da pasta atual
heroku builds:create -a seu-nome-de-app-aqui
```

## Após o Deploy

1. Execute as migrações do banco de dados:
   ```bash
   heroku run npm run db:push -a seu-nome-de-app-aqui
   ```

2. Verifique se a aplicação está funcionando:
   ```bash
   heroku open -a seu-nome-de-app-aqui
   ```

3. Monitore os logs para identificar problemas:
   ```bash
   heroku logs --tail -a seu-nome-de-app-aqui
   ```

## Plataformas Alternativas Recomendadas

Se o Heroku continuar apresentando problemas, considere estas alternativas:

1. **Render.com**: Deploy simples para projetos Node.js com PostgreSQL integrado
2. **Railway.app**: Plataforma moderna com ótimo suporte para Node.js
3. **Fly.io**: Similar ao Heroku mas com melhor detecção de projetos Node.js
4. **Vercel**: Excelente para projetos JavaScript/TypeScript (frontend)

Todas essas plataformas oferecem níveis gratuitos para testes.