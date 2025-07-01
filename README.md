# microsaas-curriculo
Projeto de um micro SAAS para criação de currículo

## Ambiente

Crie um arquivo `.env` na raiz do projeto a partir do arquivo `.env.example` e defina o token da OpenAI:

```bash
cp .env.example .env
# edite .env e adicione o token
```

Durante o build, o token será acessado através da variável `VITE_OPENAI_TOKEN`.
