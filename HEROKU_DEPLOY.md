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

### 3. Adicionar o banco de dados PostgreSQL

```bash
heroku addons:create heroku-postgresql:hobby-dev
```

Isto irá criar um banco de dados PostgreSQL gratuito para seu aplicativo e configurar automaticamente a variável de ambiente `DATABASE_URL`.

### 4. Configurar variáveis de ambiente adicionais

```bash
heroku config:set NODE_ENV=production
```

### 5. Fazer deploy do código

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
git push heroku master
```

### 6. Executar migrações do banco de dados

Após o deploy, você precisa criar as tabelas do banco de dados:

```bash
heroku run npm run db:push
```

### 7. Verificar os logs

Se você encontrar algum problema, verifique os logs:

```bash
heroku logs --tail
```

### 8. Configurar domínio personalizado (opcional)

Se você deseja usar um domínio personalizado, como `vivo.operadora.inc`:

```bash
heroku domains:add vivo.operadora.inc
```

Depois, configure os registros DNS do seu domínio conforme as instruções fornecidas pelo Heroku.

### 9. Escalar dyno (opcional)

Por padrão, o Heroku executa seu aplicativo em um dyno web gratuito. Se você precisa de mais recursos:

```bash
heroku ps:scale web=1:standard-1x
```

Nota: Isto mudará para um plano pago.

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
heroku restart
```

### Backup do banco de dados

Para fazer backup do seu banco de dados:

```bash
heroku pg:backups:capture
heroku pg:backups:download
```

## Resolução de Problemas

Se encontrar problemas com o SSL do banco de dados, verifique se o arquivo `server/db.ts` está configurado corretamente com a opção SSL para produção.

Para mais ajuda, visite [Heroku Dev Center](https://devcenter.heroku.com/) ou execute `heroku help`.