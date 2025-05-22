# Guia de Deploy no Heroku

Este guia irá ajudá-lo a fazer o deploy deste encurtador de URLs no Heroku.

## Pré-requisitos

1. Uma conta no [Heroku](https://signup.heroku.com/)
2. [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) instalado
3. [Git](https://git-scm.com/) instalado

## Passos para o Deploy

### 1. Fazer login no Heroku

```bash
heroku login
```

### 2. Criar um novo aplicativo no Heroku

```bash
heroku create seu-nome-de-app-aqui
```

Substitua `seu-nome-de-app-aqui` pelo nome desejado para seu aplicativo. Este nome será parte da URL do seu aplicativo, por exemplo: `https://seu-nome-de-app-aqui.herokuapp.com`.

### 3. Definir explicitamente o buildpack Node.js

Para garantir que o Heroku use o buildpack correto:

```bash
heroku buildpacks:set heroku/nodejs -a seu-nome-de-app-aqui
```

### 4. Adicionar o banco de dados PostgreSQL

```bash
heroku addons:create heroku-postgresql:hobby-dev -a seu-nome-de-app-aqui
```

Isto irá criar um banco de dados PostgreSQL gratuito para seu aplicativo e configurar automaticamente a variável de ambiente `DATABASE_URL`.

### 5. Configurar variáveis de ambiente adicionais

```bash
heroku config:set NODE_ENV=production -a seu-nome-de-app-aqui
```

### 6. Fazer deploy do código

Se você já iniciou um repositório Git neste projeto, você pode simplesmente adicionar o remote do Heroku e fazer push:

```bash
heroku git:remote -a seu-nome-de-app-aqui
git add .
git commit -m "Configuração inicial para deploy no Heroku"
git push heroku main
```

Se você não tem um repositório Git inicializado ainda:

```bash
git init
git add .
git commit -m "Configuração inicial para deploy no Heroku"
heroku git:remote -a seu-nome-de-app-aqui
git push heroku main
```

Se o comando `git push heroku main` falhar, tente usar `git push heroku master` em vez disso, dependendo da sua branch principal.

### 7. Executar migrações do banco de dados

Após o deploy, você precisa criar as tabelas do banco de dados:

```bash
heroku run npm run db:push -a seu-nome-de-app-aqui
```

### 8. Verificar os logs

Se você encontrar algum problema, verifique os logs:

```bash
heroku logs --tail -a seu-nome-de-app-aqui
```

### 9. Configurar domínio personalizado (opcional)

Se você deseja usar um domínio personalizado, como `vivo.operadora.inc`:

```bash
heroku domains:add vivo.operadora.inc -a seu-nome-de-app-aqui
```

Depois, configure os registros DNS do seu domínio conforme as instruções fornecidas pelo Heroku.

### 10. Escalar dyno (opcional)

Por padrão, o Heroku executa seu aplicativo em um dyno web gratuito. Se você precisa de mais recursos:

```bash
heroku ps:scale web=1:basic -a seu-nome-de-app-aqui
```

Nota: Isto mudará para um plano pago.

## Resolução de Problemas Comuns

### Problema com o Buildpack

Se o Heroku estiver detectando o buildpack errado (como Python em vez de Node.js), use este comando:

```bash
heroku buildpacks:clear -a seu-nome-de-app-aqui
heroku buildpacks:set heroku/nodejs -a seu-nome-de-app-aqui
```

### Erro H10 (App Crashed)

Se a aplicação estiver travando após o deploy:

1. Verifique os logs: `heroku logs --tail -a seu-nome-de-app-aqui`
2. Certifique-se de que todas as dependências necessárias estão no `package.json`
3. Verifique se a porta está configurada corretamente para usar `process.env.PORT`

### Problemas com o Banco de Dados

Se a aplicação não conseguir conectar ao banco de dados:

1. Verifique se o addon PostgreSQL foi criado: `heroku addons -a seu-nome-de-app-aqui`
2. Confirme que a variável DATABASE_URL está disponível: `heroku config -a seu-nome-de-app-aqui`
3. Teste executando as migrações novamente: `heroku run npm run db:push -a seu-nome-de-app-aqui`

## Manutenção

### Atualizar o aplicativo

Para enviar novas alterações ao Heroku:

```bash
git add .
git commit -m "Descrição das alterações"
git push heroku main
```

### Reiniciar o aplicativo

Se você precisar reiniciar o aplicativo:

```bash
heroku restart -a seu-nome-de-app-aqui
```

### Backup do banco de dados

Para fazer backup do seu banco de dados:

```bash
heroku pg:backups:capture -a seu-nome-de-app-aqui
heroku pg:backups:download -a seu-nome-de-app-aqui
```

## Recursos Adicionais

- [Documentação do Heroku sobre Node.js](https://devcenter.heroku.com/categories/nodejs-support)
- [Guia de PostgreSQL no Heroku](https://devcenter.heroku.com/articles/heroku-postgresql)
- [Suporte a domínios personalizados](https://devcenter.heroku.com/articles/custom-domains)

Para mais ajuda, visite [Heroku Dev Center](https://devcenter.heroku.com/) ou execute `heroku help`.