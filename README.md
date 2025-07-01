# microsaas-curriculo
Projeto de um micro SAAS para criação de currículo

## Ambiente

Crie um arquivo `.env` na raiz do projeto a partir do arquivo `.env.example` e defina o token para a API que deseja utilizar. É possível informar um token da OpenAI (`VITE_OPENAI_TOKEN`), da DeepSeek (`VITE_DEEPSEEK_TOKEN`) ou do GitHub Copilot (`VITE_GITHUB_COPILOT_TOKEN`). Caso mais de um esteja presente, a aplicação dará preferência ao token da OpenAI e, em seguida, ao da DeepSeek:

```bash
cp .env.example .env
# edite .env e adicione o token
```

Exemplo de `.env`:

```
VITE_OPENAI_TOKEN=seu_token_opcional
VITE_DEEPSEEK_TOKEN=seu_token_opcional
VITE_GITHUB_COPILOT_TOKEN=seu_token_opcional
```

Durante o build, o token será acessado através das variáveis `VITE_OPENAI_TOKEN`, `VITE_DEEPSEEK_TOKEN` ou `VITE_GITHUB_COPILOT_TOKEN`.
