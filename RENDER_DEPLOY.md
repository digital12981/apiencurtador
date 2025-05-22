# Guia de Deploy no Render.com

Este guia fornece instruções passo a passo para fazer deploy do seu encurtador de URLs no Render.com, uma alternativa moderna ao Heroku com excelente suporte para aplicações Node.js e PostgreSQL.

## Benefícios do Render.com

- Detecção automática de aplicações Node.js
- Banco de dados PostgreSQL gratuito incluído
- Implantação direta a partir do GitHub
- Certificados SSL gratuitos para domínios personalizados
- Interface simples e amigável
- Tier gratuito generoso

## Passos para o Deploy

### 1. Criar uma conta no Render.com

Acesse [render.com](https://render.com) e crie uma conta gratuita. Você pode se cadastrar com GitHub, GitLab ou email.

### 2. Conectar seu repositório Git

1. No dashboard do Render, clique em "New" e selecione "Web Service"
2. Conecte sua conta GitHub ou GitLab (se ainda não tiver feito)
3. Selecione o repositório do seu projeto de encurtador de URLs

### 3. Configurar seu Web Service

Preencha os detalhes do seu serviço:

- **Nome**: `vivo-url-shortener` (ou outro nome de sua escolha)
- **Região**: Escolha a mais próxima à sua localização
- **Branch**: `main` (ou a branch que você usa)
- **Runtime**: Node
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### 4. Configurar banco de dados PostgreSQL

1. No dashboard do Render, clique em "New" e selecione "PostgreSQL"
2. Configure seu banco de dados:
   - **Nome**: `vivo-url-db` (ou outro nome de sua escolha)
   - **Região**: A mesma do seu Web Service
   - **Plano**: Free

3. Após a criação, anote a string de conexão (Internal Database URL)

### 5. Configurar variáveis de ambiente

Volte ao seu Web Service e adicione as seguintes variáveis de ambiente:

- **NODE_ENV**: `production`
- **DATABASE_URL**: A string de conexão interna do PostgreSQL que você anotou

### 6. Iniciar o deploy

Clique em "Create Web Service" para iniciar o deploy.

### 7. Executar migrações do banco de dados

Após o deploy ser concluído:

1. Acesse a seção "Shell" do seu Web Service
2. Execute: `npm run db:push`

### 8. Configurar domínio personalizado (opcional)

1. No seu Web Service, vá para a aba "Settings" e depois "Custom Domain"
2. Clique em "Add Custom Domain"
3. Digite seu domínio: `vivo.operadora.inc`
4. Siga as instruções para configurar os registros DNS

## Monitoramento e Manutenção

### Ver logs da aplicação

Acesse a aba "Logs" do seu Web Service para ver os logs em tempo real.

### Atualizações e redeployment

Seu serviço será automaticamente atualizado quando você enviar novos commits para o repositório conectado.

### Escalar serviço (opcional)

Para aumentar recursos, vá para a aba "Settings" e atualize o plano conforme necessário.

## Solução de Problemas Comuns

### Erro na conexão com o banco de dados

Verifique se a variável de ambiente DATABASE_URL está correta e se o banco de dados está ativo.

### Falha no build

Verifique os logs de build para identificar erros específicos. Os erros comuns são:
- Dependências faltando no package.json
- Comandos de build incorretos
- Problemas de versão do Node.js

### Problemas com domínio personalizado

Certifique-se de que os registros DNS estão configurados corretamente e aguarde a propagação (pode levar até 48 horas).