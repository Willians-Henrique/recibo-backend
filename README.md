# Recibo Backend

API do sistema de imobiliária (contratos, imóveis, pessoas e endereços), construída com Express + Prisma + SQLite.

## Pré-requisitos

- Node.js 18+ e npm
- SQLite não precisa ser instalado separadamente: o Prisma cria o arquivo do banco automaticamente ao rodar as migrations.

## Configuração inicial

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Copie o arquivo de variáveis de ambiente de exemplo:

   ```bash
   copy .env.exemple .env
   ```

   O `.env` define `PORT` e `DATABASE_URL` (caminho do arquivo SQLite, relativo à pasta `prisma/`).

3. **Crie o banco de dados e aplique as migrations** (passo obrigatório antes de rodar o projeto pela primeira vez):

   ```bash
   npx prisma migrate dev
   ```

   > ⚠️ **Por que esse passo é necessário:** o `npm start` apenas inicia o servidor (`nodemon` + `tsx`) e conecta o Prisma Client ao banco — ele **não** cria o banco nem aplica migrations automaticamente. Como o projeto usa SQLite, o arquivo `data/database.sqlite` só existe depois que `prisma migrate dev` (ou `migrate deploy`) roda pela primeira vez. Se você pular essa etapa, o servidor sobe mas o log mostra `Erro de conexão ao banco (Prisma)` e qualquer rota que acesse o banco falha.

4. (Opcional) Gere o client do Prisma manualmente, caso ele não tenha sido gerado pelo passo acima:

   ```bash
   npx prisma generate
   ```

## Rodando em desenvolvimento

```bash
npm start
```

Sobe o servidor com `nodemon` + `tsx`, reiniciando automaticamente a cada alteração em `src/`.

## Build e produção

```bash
npm run build       # compila TypeScript para dist/
npm run start:prod  # roda a versão compilada (node dist/server.js)
```

Em produção, o backend também serve o build do Angular (pasta `frontend/dist/frontend/browser`) e expõe a API em `/api`.

## Scripts auxiliares (`scripts/`)

- `start.bat`: abre o navegador em `localhost:2000` e inicia `node dist/server.js` (usado em deploy local/produção).
- `update.ps1`: faz backup do `data/database.sqlite` e roda `prisma migrate deploy` (aplica migrations pendentes sem resetar dados). Use isso ao atualizar uma instalação existente, antes de substituir os arquivos da aplicação.

## Migrations do Prisma

- `npx prisma migrate dev` — uso em desenvolvimento: cria/atualiza o banco local e gera uma nova migration quando o `schema.prisma` muda.
- `npx prisma migrate deploy` — uso em produção/deploy: só aplica as migrations já existentes em `prisma/migrations/`, sem perguntar nada nem resetar dados.
- `npx prisma studio` — abre uma interface visual para inspecionar o banco.

## Solução de problemas

- **`Erro de conexão ao banco (Prisma)` ao rodar `npm start`**: o arquivo `data/database.sqlite` ainda não existe. Rode `npx prisma migrate dev` antes de iniciar o servidor.
- **Mudou o `schema.prisma` e as mudanças não aparecem**: rode `npx prisma migrate dev` novamente (cria uma nova migration) e confirme que `npx prisma generate` foi executado.
