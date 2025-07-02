# microsaas-curriculo

Aplicação web para gerar currículos profissionais usando IA. Foi criada como um micro SAAS utilizando React e Vite com Tailwind CSS.

## Requisitos

- Node.js 18 ou superior
- npm 9 ou superior

## Instalação

Clone o repositório e instale as dependências:

```bash
npm install
```

## Configuração do `.env`

Copie o arquivo `.env.example` para `.env` e informe o token da API que deseja usar. A aplicação suporta tokens da OpenAI (`VITE_OPENAI_TOKEN`), DeepSeek (`VITE_DEEPSEEK_TOKEN`) e GitHub Copilot (`VITE_GITHUB_COPILOT_TOKEN`). Caso mais de um token seja definido, o da OpenAI será priorizado, seguido pelo da DeepSeek.

```bash
cp .env.example .env
# edite .env e adicione seu token
```

Exemplo de conteúdo:

```env
VITE_OPENAI_TOKEN=seu_token_opcional
VITE_DEEPSEEK_TOKEN=seu_token_opcional
VITE_GITHUB_COPILOT_TOKEN=seu_token_opcional
```

## Executando em modo de desenvolvimento

Inicie o servidor de desenvolvimento com:

```bash
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173` por padrão.

## Build de produção

Para gerar a versão otimizada execute:

```bash
npm run build
```

Os arquivos prontos serão criados na pasta `dist`.

## Política de Cookies

Ao acessar o site pela primeira vez, é exibido um banner informando que apenas cookies essenciais são utilizados. Nenhum dado fornecido é armazenado permanentemente. Os dados do currículo são guardados temporariamente no `localStorage` e removidos automaticamente assim que a página de resultados é carregada.

## Como usar

1. Preencha o formulário inicial com suas informações profissionais.
2. Clique em gerar e aguarde a criação do currículo.
3. Após visualizar o currículo, você pode fazer o download em PDF ou iniciar um novo.

Todo conteúdo informado é descartado após a geração, garantindo privacidade total.
