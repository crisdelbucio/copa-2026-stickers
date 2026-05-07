# Guia de Deploy na Vercel

## 🚀 Passo a Passo para Publicar seu Site

### Passo 1: Criar Conta no GitHub (se não tiver)

1. Acesse [github.com](https://github.com)
2. Clique em "Sign up"
3. Preencha os dados e confirme o email

### Passo 2: Fazer Upload do Código para GitHub

1. Abra o terminal/CMD no seu computador
2. Clone o repositório (ou crie um novo):
   ```bash
   git clone https://github.com/SEU_USUARIO/copa-2026-stickers.git
   cd copa-2026-stickers
   ```

3. Se for um repositório novo, configure:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Copa 2026 Stickers App"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/copa-2026-stickers.git
   git push -u origin main
   ```

### Passo 3: Criar Conta na Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Sign Up"
3. Escolha "Continue with GitHub"
4. Autorize a Vercel a acessar sua conta GitHub

### Passo 4: Importar Projeto para Vercel

1. Na dashboard da Vercel, clique em "Add New..." → "Project"
2. Selecione o repositório `copa-2026-stickers`
3. Clique em "Import"

### Passo 5: Configurar Variáveis de Ambiente

Na página de configuração do projeto:

1. Vá para "Environment Variables"
2. Adicione as seguintes variáveis:
   - `NODE_ENV`: `production`
   - `DATABASE_URL`: (deixe em branco por enquanto)

3. Clique em "Deploy"

### Passo 6: Aguardar o Deploy

- A Vercel vai compilar e fazer o deploy automaticamente
- Você receberá um link como: `https://copa-2026-stickers-xxx.vercel.app`
- Seu site estará ao vivo!

### Passo 7: (Opcional) Usar Domínio Personalizado

1. Na dashboard do projeto, vá para "Settings" → "Domains"
2. Clique em "Add Domain"
3. Digite seu domínio (ex: figurinhas.com.br)
4. Siga as instruções para apontar o DNS

---

## 📝 Variáveis de Ambiente Necessárias

Se você precisar adicionar variáveis de ambiente, adicione em:
- **Vercel Dashboard**: Settings → Environment Variables
- **Arquivo `.env.local`** (para desenvolvimento local)

---

## ✅ Checklist Final

- [ ] Conta GitHub criada
- [ ] Código enviado para GitHub
- [ ] Conta Vercel criada
- [ ] Projeto importado na Vercel
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy realizado com sucesso
- [ ] Site acessível em vercel.app

---

## 🆘 Troubleshooting

**Erro: "Build failed"**
- Verifique se todas as dependências estão instaladas: `pnpm install`
- Verifique se o arquivo `package.json` está correto

**Erro: "Database connection failed"**
- Configure a variável `DATABASE_URL` corretamente
- Verifique se o banco de dados está acessível

**Site não carrega**
- Aguarde alguns minutos após o deploy
- Limpe o cache do navegador (Ctrl+F5)
- Verifique os logs na dashboard da Vercel

---

## 📞 Suporte

Para mais informações, visite:
- [Documentação Vercel](https://vercel.com/docs)
- [Documentação GitHub](https://docs.github.com)
