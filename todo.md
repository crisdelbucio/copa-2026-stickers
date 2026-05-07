# Controle de Figurinhas Copa 2026 - TODO

## Autenticação
- [x] Implementar tela de login
- [x] Integrar autenticação com backend (Manus OAuth)
- [x] Persistir token de sessão
- [x] Implementar logout
- [ ] Implementar recuperação de senha

## Dados de Figurinhas
- [x] Importar dados dos 12 grupos (A-L)
- [x] Importar dados dos 48 países
- [x] Importar dados das figurinhas (0-20 por país)
- [x] Criar seed de dados no banco

## Tela Home
- [x] Criar layout da tela home
- [x] Exibir resumo de figurinhas (Total, Tenho, Repetidas, Faltam)
- [x] Criar cards de estatísticas
- [x] Botão "Ver Grupos"
- [x] Botão "Meu Perfil"
- [x] Logout button

## Tela de Grupos
- [x] Listar 12 grupos (A-L)
- [x] Mostrar países de cada grupo
- [x] Mostrar barra de progresso por grupo
- [x] Navegação para detalhes do grupo

## Tela de Detalhes do Grupo
- [x] Listar países do grupo
- [x] Grid de figurinhas (0-20)
- [x] Sistema de marcação (T/R/F/vazio)
- [x] Feedback visual ao marcar
- [x] Salvar automaticamente
- [x] Mostrar progresso do país

## Tela de Perfil
- [x] Exibir dados do usuário
- [x] Estatísticas gerais
- [x] Botão logout
- [ ] Editar nome de usuário
- [ ] Opção deletar conta

## Backend/Database
- [x] Criar schema de usuários
- [x] Criar schema de coleção de figurinhas
- [x] Criar endpoints de autenticação
- [x] Criar endpoints de CRUD de figurinhas
- [x] Implementar validações com Zod

## UI/UX
- [x] Definir tema de cores
- [x] Criar componentes reutilizáveis
- [x] Implementar feedback de press
- [x] Implementar loading states
- [ ] Implementar error states
- [ ] Testes de usabilidade

## Branding
- [x] Gerar logo do app
- [x] Atualizar app.config.ts com branding
- [x] Criar splash screen
- [x] Criar ícone adaptativo Android

## Testes
- [ ] Testes unitários
- [ ] Testes de integração
- [ ] Testes end-to-end

## Deployment
- [ ] Build Android APK
- [ ] Build iOS IPA
- [ ] Publicar na Play Store
- [ ] Publicar na App Store

## Atualizações Solicitadas
- [x] Adicionar avatar do palhaço festivo
- [x] Mudar cor primária de azul para verde
- [x] Atualizar tela de login com novo avatar
- [x] Atualizar tela de perfil com novo avatar

## Logotipo KIMANA
- [x] Adicionar logotipo KIMANA abaixo do avatar na tela de login

## Otimização para Web
- [x] Ajustar layout para desktop (grid de figurinhas maior)
- [x] Otimizar navegação para mouse e teclado
- [x] Melhorar responsividade para diferentes tamanhos de tela
- [ ] Adicionar suporte a drag-and-drop para figurinhas
- [ ] Testar em navegadores desktop

## Deploy na Vercel
- [x] Criar arquivo vercel.json com configurações
- [x] Preparar variáveis de ambiente para Vercel
- [x] Criar guia de deploy (DEPLOY_VERCEL.md)
- [ ] Fazer push do código para GitHub
- [ ] Conectar repositório à Vercel
- [ ] Configurar domínio gratuito da Vercel
- [ ] Testar site publicado

## Personalização da Home
- [x] Adicionar logo KIMANA na home com o palhaço
