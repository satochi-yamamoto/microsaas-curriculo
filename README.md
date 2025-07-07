# Microsaas Currículo

Aplicação web em React para gerar currículos de profissionais de tecnologia utilizando a API da OpenAI. Os dados dos usuários e dos currículos gerados são armazenados no Supabase.

## Requisitos

- Node.js 20 ou superior
- npm

## Configuração

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Copie o arquivo de exemplo `.env.example` para `.env` e defina as chaves de acesso:

   ```bash
   cp .env.example .env
   ```

   Preencha as seguintes variáveis no arquivo `.env`:

   ```env
   VITE_OPENAI_API_KEY=seu_token_openai
   VITE_SUPABASE_URL=https://<sua-instancia>.supabase.co
   VITE_SUPABASE_ANON_KEY=sua_chave_anon
   ```

## Execução em desenvolvimento

Inicie o servidor de desenvolvimento com o Vite:

```bash
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173`.

## Build de produção

Para gerar os arquivos otimizados para produção, execute:

```bash
npm run build
```

Para conferir o resultado localmente:

```bash
npm run preview
```

## Utilização do Supabase

O projeto utiliza o Supabase para autenticação e armazenamento dos currículos. Para criar as tabelas necessárias, carregue o arquivo `supabase/schema.sql` em sua instância ou utilize a CLI:

```bash
supabase db push supabase/schema.sql
```

Se preferir, execute o script abaixo que realiza o mesmo comando automaticamente
(é necessário ter o Supabase CLI instalado):

```bash
npm run setup:db
```

As tabelas criadas são:

- **profiles** – complementa `auth.users` com dados de assinatura e controle de geração.
- **curriculos** – guarda cada currículo gerado e faz referência ao usuário.

## Docker

Também é possível criar uma imagem Docker para servir a aplicação:

```bash
docker build -t microsaas-curriculo .
```

Em seguida execute o contêiner:

```bash
docker run -p 80:80 microsaas-curriculo
```

---

Sinta-se à vontade para enviar melhorias ou relatar problemas através de pull requests.
