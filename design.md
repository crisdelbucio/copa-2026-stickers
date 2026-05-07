# Design do Aplicativo - Controle de Figurinhas Copa 2026

## Visão Geral
Aplicativo móvel para colecionadores de figurinhas da Copa 2026, permitindo rastrear figurinhas possuídas, repetidas e faltantes com sistema de login para persistência de dados.

## Orientação & Uso
- **Orientação**: Portrait (9:16)
- **Uso**: Uma mão
- **Estilo**: Limpo, intuitivo, seguindo padrões iOS HIG

## Paleta de Cores
- **Primária**: #0a7ea4 (Azul Copa)
- **Background**: #ffffff (Light) / #151718 (Dark)
- **Surface**: #f5f5f5 (Light) / #1e2022 (Dark)
- **Foreground**: #11181C (Light) / #ECEDEE (Dark)
- **Sucesso**: #22C55E (Verde)
- **Aviso**: #F59E0B (Laranja)
- **Erro**: #EF4444 (Vermelho)

## Telas Principais

### 1. Tela de Login/Registro
**Conteúdo**:
- Logo do app
- Campo de email
- Campo de senha
- Botão "Entrar"
- Link "Criar conta"
- Link "Recuperar senha"

**Funcionalidade**:
- Validação de email e senha
- Criar novo usuário
- Manter sessão ativa

### 2. Tela Home (Após Login)
**Conteúdo**:
- Header com nome do usuário e botão logout
- Cards de resumo:
  - Total de figurinhas
  - Figurinhas que tenho (T)
  - Figurinhas repetidas (R)
  - Figurinhas que faltam (F)
- Botão "Ver Todas as Figurinhas"
- Botão "Meus Grupos"

**Funcionalidade**:
- Exibir estatísticas gerais
- Navegação rápida para grupos

### 3. Tela de Grupos
**Conteúdo**:
- Lista de 12 grupos (A-L)
- Cada grupo mostra:
  - Nome do grupo
  - Progresso visual (barra)
  - Quantidade: Tenho / Total
  - Países do grupo

**Funcionalidade**:
- Tap para expandir/ver países
- Navegação para detalhe do grupo

### 4. Tela de Detalhes do Grupo
**Conteúdo**:
- Nome do grupo
- Lista de países com suas figurinhas
- Para cada país:
  - Flag/Código do país
  - Nome do país
  - Grid de figurinhas (números 0-20)
  - Cada figurinha mostra status (T/R/F/vazio)

**Funcionalidade**:
- Tap em figurinha para marcar como Tenho (T)
- Tap novamente para marcar como Repetida (R)
- Tap novamente para marcar como Falta (F)
- Tap novamente para limpar
- Salvar automaticamente
- Mostrar progresso do país

### 5. Tela de Perfil
**Conteúdo**:
- Nome do usuário
- Email
- Data de criação da conta
- Estatísticas gerais
- Botão "Logout"
- Botão "Deletar Conta"

**Funcionalidade**:
- Editar nome de usuário
- Logout seguro
- Opção de deletar conta

## Fluxos Principais

### Fluxo de Login
1. Usuário abre app
2. Vê tela de login
3. Insere email e senha
4. Clica "Entrar"
5. Se credenciais corretas → vai para Home
6. Se não tem conta → clica "Criar conta" → formulário de registro

### Fluxo de Marcação de Figurinhas
1. Usuário está na tela Home
2. Clica em "Ver Todas as Figurinhas" ou seleciona um grupo
3. Vê lista de países
4. Seleciona um país
5. Vê grid de figurinhas (0-20)
6. Clica em figurinha para marcar:
   - 1º clique: Marca como "Tenho" (T) - cor verde
   - 2º clique: Marca como "Repetida" (R) - cor laranja
   - 3º clique: Marca como "Falta" (F) - cor vermelha
   - 4º clique: Remove marcação
7. Dados salvos automaticamente

### Fluxo de Visualização de Progresso
1. Usuário vê Home com resumo
2. Clica em card de "Meus Grupos"
3. Vê lista de 12 grupos com barras de progresso
4. Pode clicar em grupo para ver detalhes
5. Vê países e figurinhas daquele grupo

## Componentes Reutilizáveis

- **Button**: Botão primário com feedback de press
- **Card**: Container com sombra e borda
- **ProgressBar**: Barra de progresso visual
- **Figurinha**: Componente individual de figurinha com 4 estados
- **CountryItem**: Item de país com resumo
- **Header**: Header com título e ações

## Estrutura de Dados

### User
- id: string
- email: string
- password: hash
- name: string
- createdAt: timestamp

### UserCollection
- userId: string
- countryCode: string
- figurinhaNumber: number (0-20)
- status: 'T' | 'R' | 'F' | null
- updatedAt: timestamp

### Countries
- code: string (MEX, RSA, etc)
- name: string
- group: string (A-L)
- figurinhasCount: number (21 figurinhas por país: 0-20)
