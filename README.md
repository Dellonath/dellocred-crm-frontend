## 🧩 Comandos Disponíveis

- `npm run dev`  
  Inicia o servidor de desenvolvimento.  
  A aplicação ficará disponível em: [http://localhost:3000](http://localhost:3000)

- `npm run test`  
  Executa os testes unitários uma vez.

- `npm run test:watch`  
  Executa os testes unitários e mantém o modo de observação ativo, reexecutando os testes a cada alteração no código.

- `npm run lint`  
  Executa o ESLint para verificar problemas de estilo e qualidade de código em todo o projeto.

## 📁 Estrutura de Pastas

```text
project-root/
├───src                             # Código-fonte da aplicação
│   ├───app
│   │   ├───entities                # Tipagem de entidades da aplicação
│   │   ├───config                  # Arquivos de configuração (Ex: constants.ts, localStorageKeys.ts)
│   │   ├───contexts                # Contextos do React
│   │   ├───lib                     # Configurações de bibliotecas (Ex: Tanstack Query, Axios, etc.)
│   │   ├───hooks                   # Hooks personalizados
│   │   ├───utils                   # Funções utilitárias (Ex: formatDate, capitalizeFirstLetters, etc.)
│   │   └───services                # Serviços relacionados a chamadas HTTP
│   │
│   ├───assets                      # Imagens, ícones, fontes, etc.
│   ├───router                      # Definições de rotas e navegação
│   └───view
│       ├───components              # Componentes globais da aplicação (Ex: Button, Input, etc.)
│       │   └───ui                  # Componentes visuais reutilizáveis (Shadcn/ui)
│       ├───layouts                 # Layouts reutilizáveis (ex: dashboardLayout, authLayout, etc.)
│       └───pages
│           └───pageName            # Diretório contendo o nome da página
│               └───components      # Diretório contendo os componentes exclusivos da página
│
├───test                            # Configuração e testes
│   └───e2e                         # Testes End-to-End (usando ferramentas como Cypress ou Playwright)
```
