# Guia de Deploy no Fly.io

Este guia fornece instruções passo a passo para fazer deploy do seu encurtador de URLs no Fly.io, uma excelente alternativa ao Heroku para aplicações Node.js.

## Vantagens do Fly.io

- Detecção automática de projetos Node.js
- Banco de dados PostgreSQL gratuito
- Implantação simples via linha de comando
- Gratuito para projetos pequenos
- Certificados SSL automáticos
- Presença global (servers em múltiplas regiões)

## Passos para o Deploy

### 1. Criar uma conta no Fly.io

Acesse [fly.io](https://fly.io) e crie uma conta gratuita.

### 2. Instalar a CLI do Fly.io

Instale a ferramenta de linha de comando do Fly:

```bash
# Mac
brew install flyctl

# Windows (PowerShell como administrador)
iwr https://fly.io/install.ps1 -useb | iex

# Linux
curl -L https://fly.io/install.sh | sh
```

### 3. Fazer login na conta

```bash
fly auth login
```

### 4. Iniciar a configuração do aplicativo

Na pasta do seu projeto, execute:

```bash
fly launch
```

Durante este processo interativo:
- Dê um nome à sua aplicação (ex: vivo-url-shortener)
- Selecione a região mais próxima
- Quando perguntado se deseja criar um banco de dados PostgreSQL, responda "yes"
- Escolha o plano gratuito para o banco de dados

### 5. Verificar a configuração gerada

O comando `fly launch` terá criado um arquivo `fly.toml` na raiz do seu projeto. Verifique se a configuração está correta, especialmente a porta e os comandos de build.

Exemplo de um arquivo `fly.toml` adequado:

```toml
app = "vivo-url-shortener"
primary_region = "gru"  # São Paulo

[build]
  builder = "heroku/buildpacks:20"

[env]
  PORT = "8080"
  NODE_ENV = "production"

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0
```

### 6. Ajustar a porta da aplicação

Certifique-se de que o arquivo `server/index.ts` esteja usando a variável PORT corretamente:

```typescript
const port = process.env.PORT || 5000;
```

### 7. Fazer o deploy

```bash
fly deploy
```

Este comando irá:
- Construir uma imagem do seu aplicativo
- Enviar para o Fly.io
- Iniciar o aplicativo nas regiões configuradas

### 8. Executar migrações de banco de dados

Após o deploy, execute:

```bash
fly ssh console -C "npm run db:push"
```

### 9. Configurar domínio personalizado

Para usar seu domínio personalizado `vivo.operadora.inc`:

```bash
fly domains add vivo.operadora.inc
```

O Fly.io fornecerá instruções sobre como configurar os registros DNS necessários.

## Monitoramento e Manutenção

### Ver logs da aplicação

```bash
fly logs
```

### Acessar sua aplicação

```bash
fly open
```

### Verificar status

```bash
fly status
```

### Escalar aplicação (opcional)

```bash
fly scale memory 1024
```

## Solução de Problemas

### Problema com portas

Se a aplicação não iniciar corretamente, verifique se a porta configurada no `fly.toml` corresponde à porta usada na sua aplicação.

### Problemas de banco de dados

Verifique se a variável de ambiente `DATABASE_URL` foi configurada corretamente:

```bash
fly secrets list
```

Se precisar ajustar:

```bash
fly secrets set DATABASE_URL="sua-string-de-conexao"
```

### Problemas de deploy

Se o deploy falhar, verifique os logs:

```bash
fly logs
```

### Reiniciar aplicação

Se precisar reiniciar a aplicação:

```bash
fly apps restart
```

## Considerações Finais

O Fly.io é uma ótima alternativa para aplicações Node.js com PostgreSQL, oferecendo um tier gratuito generoso e uma experiência de deploy simples e eficiente. A plataforma detecta automaticamente projetos Node.js e configura corretamente o ambiente de execução.