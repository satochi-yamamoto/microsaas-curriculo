# microsaas-curriculo
Projeto de um micro SAAS para criação de currículo

## Ambiente

Crie um arquivo `.env` na raiz do projeto a partir do arquivo `.env.example` e defina o token para a API que deseja utilizar. É possível informar um token da OpenAI (`VITE_OPENAI_TOKEN`) ou da DeepSeek (`VITE_DEEPSEEK_TOKEN`). Caso ambos estejam presentes, a aplicação dará preferência ao token da OpenAI:

```bash
cp .env.example .env
# edite .env e adicione o token
```

Exemplo de `.env`:

```
VITE_OPENAI_TOKEN=seu_token_opcional
VITE_DEEPSEEK_TOKEN=seu_token_opcional
```

Durante o build, o token será acessado através das variáveis `VITE_OPENAI_TOKEN` ou `VITE_DEEPSEEK_TOKEN`.
