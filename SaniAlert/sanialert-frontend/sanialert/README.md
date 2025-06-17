# SaniAlert Frontend

Este projeto é o frontend do SaniAlert, um sistema para monitoramento da qualidade da água. Ele é construído com React, TypeScript e Vite.

## Estrutura do Projeto

O código principal da aplicação está localizado no diretório `src`.

-   `assets/`: Arquivos estáticos como imagens e ícones.
-   `components/`: Componentes reutilizáveis de UI.
    -   `auth/`: Componentes relacionados à autenticação (ex: `LoginModal.tsx`).
    -   `incluirDados/`: Componentes específicos da tela "+ Incluir Dados" (ex: `FilterCardIncluir.tsx`, `PocoArtesianoList.tsx`).
    -   `situacaoAtual/`: Componentes específicos da tela "Situação Atual" (ex: `BairroCard.tsx`, `FilterBarSituacao.tsx`).
    -   Outros componentes gerais como `Card.tsx`, `Modal.tsx`, `Navbar.tsx`, `Toast.tsx`, `Tooltip.tsx`.
-   `pages/`: Componentes de telas principais.
    -   `IncluirDadosScreen/`: Tela administrativa para gerenciamento de dados.
    -   `MenuScreen/`: Página inicial.
    -   `PocoDetails/` (anteriormente `Screen1.tsx`): Tela para gerenciamento detalhado de poços artesianos.
    -   `SituacaoAtualScreen/`: Tela para visualizar o status atual da qualidade da água por bairro.
    -   `SituacaoBairro/` (anteriormente `Screen2.tsx`): Tela para monitoramento detalhado de um bairro específico.
-   `public/`: Arquivos públicos.
-   `services/`: Serviços para interação com APIs (ex: `CardService.ts`).
-   `store/`: Configuração do Redux, slices e hooks.
-   `types/`: Definições de tipos TypeScript.
-   `App.tsx`: Componente principal da aplicação, gerencia rotas e estado global.
-   `main.tsx`: Ponto de entrada da aplicação.

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm install`

Instala as dependências do projeto.

### `npm run dev`

Executa o app em modo de desenvolvimento.
Abra [http://localhost:5173](http://localhost:5173) (ou a porta exibida no terminal) para visualizar no navegador.

A página será recarregada se você fizer alterações.
Você também verá erros de lint no console.

### `npm run build`

Gera o build de produção na pasta `dist`.
O React é empacotado em modo produção e otimizado para melhor performance.

O build é minificado e os nomes dos arquivos incluem hashes.
Sua aplicação estará pronta para ser implantada!

### `npm run lint`

Executa o linter nos arquivos do projeto usando o ESLint.

### `npm run preview`

Serve o build de produção localmente para visualização.

## Funcionalidades Principais

-   **Barra de Navegação**:
    -   Opções: "Menu", "Situação Atual", "+ Incluir Dados" (apenas admin).
    -   Ícone de usuário com modal de login.
-   **Autenticação de Admin**:
    -   Login via modal com credenciais fixas (email: `admin@sanialert.com`, senha: `Sani123`).
-   **Telas**:
    -   **Menu**: Página inicial com conteúdo informativo.
    -   **Situação Atual**:
        -   Filtro por cidade/bairro.
        -   Exibe cards clicáveis para bairros.
        -   O card "Jardim Alvorada" navega para a tela de monitoramento.
    -   **+ Incluir Dados** (Admin):
        -   Card de filtro.
        -   Lista de poços artesianos.
        -   O primeiro card de poço é clicável e navega para tela de gerenciamento detalhado.
    -   **Situação Bairro** (Monitoramento do "Jardim Alvorada"):
        -   Exibe informações detalhadas do bairro selecionado.
        -   Inclui mapa e cards destacados/outros.
    -   **Poco Details** (Gerenciamento de Poço):
        -   Visualização detalhada e opções de gerenciamento para um poço artesiano selecionado.
-   **Gerenciamento de Estado**:
    -   Redux Toolkit para gerenciar estado da aplicação, incluindo dados dos cards e status de admin.

## Imagens Temporárias

O projeto utiliza imagens temporárias em vários locais:
-   `src/assets/water-quality.jpg`
-   `src/assets/city-water.jpg`
-   `src/assets/jardim-alvorada.jpg`
-   `src/assets/map-placeholder.jpg`

Estas devem ser substituídas por imagens finais assim que disponíveis.

## Próximos Passos

-   Substituir todas as imagens temporárias por versões finais.
-   Completar a navegação entre todas as telas, garantindo que todos os links e botões funcionem corretamente.
-   Testar todos os fluxos de navegação, interações de UI e funcionalidades de admin.
-   Revisar e refatorar código legado ou imports não utilizados.
-   Implementar integração com API backend para busca e atualização dinâmica de dados.
-   Expandir as opções de filtro.
-   Adicionar mais visualizações detalhadas e interações para poços artesianos e bairros.

# React + TypeScript + Vite

Este template fornece uma configuração mínima para usar React com Vite, HMR e algumas regras de ESLint.

Atualmente, dois plugins oficiais estão disponíveis:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) usa [Babel](https://babeljs.io/) para Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) usa [SWC](https://swc.rs/) para Fast Refresh

## Expandindo a configuração do ESLint

Se você estiver desenvolvendo uma aplicação para produção, recomenda-se atualizar a configuração para ativar regras de lint com verificação de tipos:

```js
export default tseslint.config({
  extends: [
    // Remova ...tseslint.configs.recommended e substitua por:
    ...tseslint.configs.recommendedTypeChecked,
    // Ou use para regras mais rígidas
    ...tseslint.configs.strictTypeChecked,
    // Opcionalmente, adicione para regras de estilo
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // outras opções...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

Você também pode instalar [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) e [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) para regras específicas do React:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Adicione os plugins react-x e react-dom
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // outras regras...
    // Ative as regras recomendadas para typescript
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
