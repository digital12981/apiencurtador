# Solução para Deploy no Heroku

Este é um guia passo a passo para resolver o problema específico que você está enfrentando no Heroku.

## O Problema

O Heroku está tendo dificuldades em:
1. Reconhecer corretamente o projeto como Node.js
2. Encontrar o comando `vite` durante o processo de build

## Solução Passo a Passo

### 1. Limpar completamente os buildpacks

No dashboard do Heroku ou via CLI:

```bash
heroku buildpacks:clear -a seu-nome-de-app
```

### 2. Adicionar o buildpack oficial do Node.js

```bash
heroku buildpacks:set heroku/nodejs -a seu-nome-de-app
```

### 3. Configurar o npm para instalar as dependências de desenvolvimento

Por padrão, o Heroku não instala dependências de desenvolvimento (onde vite está). Vamos mudar isso:

```bash
heroku config:set NPM_CONFIG_PRODUCTION=false -a seu-nome-de-app
```

### 4. Definir a versão do Node.js

Crie um arquivo `package.json` (ou altere o seu existente se possível) para incluir a versão do Node.js:

```json
{
  "engines": {
    "node": "18.x"
  }
}
```

### 5. Simplificar o Procfile

Edite o Procfile para conter apenas:

```
web: npm start
```

### 6. Pré-construir o aplicativo localmente antes do deploy

Este é um passo crucial - você deve construir o aplicativo localmente e incluir a pasta `dist` no seu commit:

```bash
# Construir o aplicativo localmente
npm run build

# Adicionar a pasta dist ao controle de versão
git add dist -f
git commit -m "Add dist folder for Heroku deployment"

# Fazer deploy novamente
git push heroku main
```

Ao incluir a pasta `dist` no seu repositório, o Heroku não precisará executar o comando `vite` durante o deploy.

### 7. Verificar logs e status após o deploy

```bash
heroku logs --tail -a seu-nome-de-app
```

## Alternativa: Usar o heroku.yml

Se os passos acima não funcionarem, podemos tentar usar o `heroku.yml` para maior controle:

1. Crie um arquivo `heroku.yml` na raiz do projeto:

```yaml
build:
  docker:
    web: Dockerfile
```

2. Crie um Dockerfile simples:

```dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

CMD ["npm", "start"]
```

3. Defina o buildpack para container:

```bash
heroku buildpacks:set heroku/nodejs
```

4. Faça deploy:

```bash
git add .
git commit -m "Add Heroku configuration"
git push heroku main
```

## Conclusão

Se essas soluções não funcionarem, recomendo fortemente considerar o uso de uma plataforma mais amigável para projetos Node.js modernos, como Render.com ou Fly.io, conforme os guias que já forneci.