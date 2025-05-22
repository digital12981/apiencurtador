# Instruções para Deploy Manual no Heroku

Este guia oferece instruções passo a passo para fazer deploy manual deste projeto no Heroku, especificamente para resolver problemas de detecção do buildpack.

## Preparação Inicial

1. Instale a [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Faça login no Heroku:
   ```
   heroku login
   ```

## Passos para o Deploy Manual

### 1. Criar uma nova aplicação Heroku

```bash
heroku create seu-nome-de-app-aqui
```

### 2. Forçar o uso do buildpack Node.js via CLI

Este é o passo crucial para resolver o problema que você está enfrentando:

```bash
heroku buildpacks:clear -a seu-nome-de-app-aqui
heroku buildpacks:set heroku/nodejs -a seu-nome-de-app-aqui
```

### 3. Adicionar o banco de dados PostgreSQL

```bash
heroku addons:create heroku-postgresql:hobby-dev -a seu-nome-de-app-aqui
```

### 4. Configurar as variáveis de ambiente

```bash
heroku config:set NODE_ENV=production -a seu-nome-de-app-aqui
```

### 5. Fazer deploy via Git

Primeiro, conecte sua pasta local ao repositório Heroku:

```bash
heroku git:remote -a seu-nome-de-app-aqui
```

Em seguida, faça o deploy:

```bash
git push heroku main
```

## Alternativa: Deploy sem Git (se os passos acima não funcionarem)

Se você ainda estiver enfrentando problemas com o método baseado em Git, você pode usar a Heroku CLI para fazer um deploy direto da sua pasta atual:

1. Instale o plugin da Heroku para deploy direto:
   ```bash
   heroku plugins:install heroku-builds
   ```

2. Faça o deploy direto da pasta atual:
   ```bash
   heroku builds:create -a seu-nome-de-app-aqui
   ```

Este método ignora o Git e envia um arquivo compactado da sua aplicação diretamente para o Heroku, contornando qualquer problema de detecção de buildpack.

## Após o Deploy

1. Execute as migrações do banco de dados:
   ```bash
   heroku run npm run db:push -a seu-nome-de-app-aqui
   ```

2. Verifique se a aplicação está funcionando:
   ```bash
   heroku open -a seu-nome-de-app-aqui
   ```

3. Se ocorrer algum problema, verifique os logs:
   ```bash
   heroku logs --tail -a seu-nome-de-app-aqui
   ```

## Usando sua Própria Hospedagem

Alternativamente, você pode hospedar este projeto em qualquer provedor que suporte Node.js e PostgreSQL. Isso evitaria os problemas específicos do Heroku:

1. **DigitalOcean App Platform**: Suporta Node.js e PostgreSQL nativamente
2. **Railway.app**: Implantação simples de projetos Node.js
3. **Render.com**: Suporte integrado para Node.js e PostgreSQL

Todos esses provedores possuem uma interface mais simples para deploy de aplicações Node.js.