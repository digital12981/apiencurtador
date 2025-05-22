# Solução Final para Deploy no Heroku

Aqui está uma solução passo a passo para resolver os problemas específicos do deploy no Heroku:

## 1. Configurar a versão do Node.js

Primeiro, precisamos especificar a versão do Node.js para o Heroku.

Execute o seguinte comando para configurar a versão do Node.js como uma variável de ambiente no Heroku:

```bash
heroku config:set NODE_VERSION=18.x -a seu-app-name
```

## 2. Configurar para instalar dependências de desenvolvimento

O Heroku normalmente não instala dependências de desenvolvimento, mas precisamos delas para o build:

```bash
heroku config:set NPM_CONFIG_PRODUCTION=false -a seu-app-name
```

## 3. Reiniciar o buildpack

É importante garantir que o buildpack correto seja utilizado:

```bash
# Remover todos os buildpacks
heroku buildpacks:clear -a seu-app-name

# Adicionar o buildpack Node.js
heroku buildpacks:set heroku/nodejs -a seu-app-name
```

## 4. Atualizar o Procfile

Crie ou atualize o arquivo `Procfile` na raiz do projeto com o seguinte conteúdo:

```
web: npm start
```

## 5. Ajustar as configurações do Vite

O erro "Rollup failed to resolve import "/src/main.tsx" from "client/index.html" indica um problema de caminho relativo. Já corrigimos isso alterando o caminho no HTML.

O que fizemos foi mudar de:
```html
<script type="module" src="/src/main.tsx"></script>
```

Para:
```html
<script type="module" src="./src/main.tsx"></script>
```

## 6. Fazer um novo deploy

Depois de fazer as mudanças acima, faça o commit e o push:

```bash
git add .
git commit -m "Fix Heroku deployment issues"
git push heroku main
```

## 7. Verificar os logs

Se ainda houver problemas, verifique os logs para mais detalhes:

```bash
heroku logs --tail -a seu-app-name
```

## Se ainda tiver problemas...

Se o deploy continuar falhando após essas tentativas, recomendo fortemente considerar as alternativas:

1. **Render.com** - muito mais amigável para projetos modernos de Node.js
2. **Fly.io** - excelente suporte para Node.js e PostgreSQL

Ambas as plataformas têm níveis gratuitos generosos e são especificamente otimizadas para aplicações como a sua.

Os guias detalhados para essas plataformas estão nos arquivos RENDER_DEPLOY.md e FLY_IO_DEPLOY.md que já criamos.