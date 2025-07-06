# microsaas-curriculo-with-data

## Configuração de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
VITE_OPENAI_API_KEY=
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Insira os valores adequados para cada chave antes de iniciar o projeto.

## Supabase

O projeto utiliza o [Supabase](https://supabase.com/) para autenticação e
armazenamento dos currículos gerados. No diretório `supabase/` há um arquivo
`schema.sql` contendo a estrutura das tabelas usadas pela aplicação. Para
configurar o banco de dados, faça o upload desse script no painel do Supabase
ou execute-o usando a CLI:

```bash
supabase db push supabase/schema.sql
```

As tabelas criadas são:

* **profiles** – estende `auth.users` com informações de assinatura e controle
  de geração.
* **curriculos** – armazena cada currículo criado e está relacionado ao usuário
  que o gerou.
