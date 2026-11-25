# Catálogo de Jogos, React Native + Expo

Aplicativo mobile desenvolvido com **React Native e Expo** que permite consultar um catálogo de jogos gratuitos, visualizar informações individuais e salvar jogos favoritos no armazenamento local do dispositivo.

O projeto foi desenvolvido como parte da Atividade Individual 05, com foco em consumo de API, navegação entre telas, estilização com React Native Paper e persistência de dados com AsyncStorage.

## Funcionalidades

### 1. Catálogo de jogos
- Consulta jogos gratuitos por meio da API FreeToGame.
- Exibição de nome, imagem, gênero, plataforma e descrição resumida.
- Listagem dos jogos disponíveis.
- Indicador de carregamento durante a consulta.
- Tratamento de erros de conexão, com opção de tentar novamente.

### 2. Pesquisa de jogos
- Pesquisa por nome do jogo.
- Filtro por gênero.
- Atualização da lista conforme o texto pesquisado.

### 3. Detalhes do jogo
- Tela individual para cada jogo selecionado.
- Exibição de imagem, título, gênero e plataforma.
- Informações sobre desenvolvedor e publicadora, quando disponíveis.
- Data de lançamento e descrição.
- Identificação do jogo pelo seu ID.

### 4. Sistema de favoritos
- Adicionar jogos à lista de favoritos.
- Remover jogos dos favoritos.
- Consultar os jogos salvos em uma tela específica.
- Persistência dos favoritos utilizando AsyncStorage.
- Recuperação dos favoritos ao abrir novamente o aplicativo.

### 5. Navegação entre telas
O aplicativo utiliza React Navigation para organizar a navegação entre três telas principais:

- **Catálogo:** apresenta os jogos disponíveis.
- **Detalhes:** apresenta informações completas do jogo selecionado.
- **Favoritos:** apresenta os jogos salvos pelo usuário.

## Tecnologias utilizadas

- React Native
- Expo
- JavaScript
- React Navigation
- React Native Paper
- AsyncStorage
- API FreeToGame

## Estrutura do projeto

```text
catalogo-jogos-expo/
│
├── assets/
│
├── src/
│   ├── navigation/
│   │   └── AppNavigator.js
│   │
│   ├── screens/
│   │   ├── CatalogoScreen.js
│   │   ├── DetalhesScreen.js
│   │   └── FavoritosScreen.js
│   │
│   └── storage/
│       └── favoritosStorage.js
│
├── App.js
├── app.json
├── index.js
├── package.json
└── README.md
```

## Como executar o projeto

### Pré-requisitos

- Node.js instalado.
- npm instalado.
- Expo Go no dispositivo móvel ou um emulador Android configurado.

### Instalação

Clone o repositório:

```bash
git clone https://github.com/luissbezerra/catalogo-jogos-expo-react-rotas.git
```

Entre na pasta:

```bash
cd catalogo-jogos-expo-react-rotas
```

Instale as dependências:

```bash
npm install
```

Inicie o Expo:

```bash
npx expo start
```

Leia o QR Code com o Expo Go ou execute em um emulador compatível.

## API utilizada

**FreeToGame API**

A aplicação utiliza a API FreeToGame para consultar informações sobre jogos gratuitos.

Documentação e acesso:

https://www.freetogame.com/api-doc

## Armazenamento local

Os jogos favoritos são armazenados no dispositivo por meio do AsyncStorage. Dessa forma, os dados permanecem disponíveis mesmo depois que o aplicativo é fechado e aberto novamente.

## Objetivo acadêmico

Demonstrar, na prática, a integração entre React Native e Expo, consumo de uma API externa, navegação entre telas, utilização de componentes do React Native Paper e armazenamento persistente de informações localmente.