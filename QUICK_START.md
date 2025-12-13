# 🚀 Início Rápido - Wtm Corps Finanças

## ⚡ Quick Start (2 minutos)

### 1. Clone/Abra o Projeto
```bash
cd "Site Wtm corps finanças"
```

### 2. Rode o Setup
```bash
# Windows
powershell -ExecutionPolicy Bypass -File setup.ps1

# Linux/Mac
bash setup.sh

# Ou manual
npm install
```

### 3. Configure Supabase
1. Vá para [supabase.com](https://supabase.com)
2. Crie um novo projeto (gratuito)
3. Copie URL e chaves
4. Cole em `.env.local`
5. Execute o SQL do `SETUP_COMPLETO.md`

### 4. Inicie o Servidor
```bash
npm run dev
```

Abra: **http://localhost:3000**

---

## 📋 Arquivos Importantes

| Arquivo | Propósito |
|---------|-----------|
| `.env.local` | Suas credenciais (NÃO COMMITAR) |
| `.env.example` | Template de referência |
| `SETUP_COMPLETO.md` | Documentação completa |
| `ATUALIZACOES.md` | Resumo do que foi feito |
| `src/lib/supabase.ts` | Conexão com banco |
| `src/app/api/chat/route.ts` | API do ChatBot |
| `src/components/ai/Chat.tsx` | Component do Chat |
| `middleware.ts` | Proteção de rotas |

---

## 🔐 Variáveis de Ambiente

Você precisa preencher em `.env.local`:

```env
# Já inserida ✅
OPENAI_API_KEY=sk-proj-XytbCxI3...

# Você vai colocar do Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

---

## 🤖 Usar o Chat

### Componente React
```tsx
import Chat from '@/components/ai/Chat';

export default function ChatPage() {
  return <Chat />;
}
```

### Ou com ID específico
```tsx
<Chat chatId="conversa-123" />
```

---

## 🧬 Autenticação

### Login
```tsx
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  
  await login('user@email.com', 'password');
}
```

### Verificar se está logado
```tsx
const { user, isAuthenticated, logout } = useAuth();

if (!isAuthenticated) {
  return <Navigate to="/login" />;
}
```

---

## 🔥 Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor (localhost:3000)

# Build
npm run build            # Prepara para produção
npm start                # Inicia servidor de produção

# Qualidade
npm run lint             # Verifica código

# Git
git add .                # Stage all files
git commit -m "feat: ..."  # Commit
git push                 # Push para GitHub
```

---

## 📡 Deploy no Vercel (3 passos)

1. **Conecte seu repo GitHub ao Vercel**
   - Vá em [vercel.com](https://vercel.com)
   - Clique "New Project"
   - Selecione seu repositório

2. **Adicione variáveis de ambiente**
   - Settings → Environment Variables
   - Copie as 3 variáveis do Supabase
   - Copie a chave OpenAI

3. **Deploy**
   - Clique em "Deploy"
   - Aguarde (2-3 minutos)
   - Seu site está no ar! 🎉

---

## 🐛 Não Funciona? Checklist

- [ ] Instalou dependências? (`npm install`)
- [ ] Preencheu `.env.local`? (veja `.env.example`)
- [ ] Criou as tabelas no Supabase? (veja `SETUP_COMPLETO.md`)
- [ ] API Key OpenAI está válida? (teste em platform.openai.com)
- [ ] Supabase está online? (veja dashboard)
- [ ] Verifica console do navegador (F12 → Console)?

---

## 🎓 Aprenda Mais

- [Next.js Docs](https://nextjs.org/docs) - React Framework
- [Supabase Docs](https://supabase.com/docs) - Database
- [OpenAI API](https://platform.openai.com/docs) - AI
- [Vercel Docs](https://vercel.com/docs) - Hosting

---

## 💬 Chat com IA (Recursos)

O chatbot é especializado em:
- 💰 **Investimentos** - CDB, Tesouro, Ações, Criptos
- 💳 **Cartões** - Cashback, milhas, benefícios
- 📊 **Planejamento** - Orçamento, metas, reserva
- 📈 **Análise** - Risco, diversificação, impostos
- 🇧🇷 **Brasil** - Selic, CDI, IPCA, impostos locais

---

## 📞 Precisa de Ajuda?

1. **Erro no chat?**
   - Verifique `console.log` (F12)
   - Verifique API key OpenAI

2. **Erro de autenticação?**
   - Verifique emails cadastrados no Supabase
   - Limpe cookies/cache

3. **Banco não sincroniza?**
   - Verifique conexão Internet
   - Reinicie servidor (`npm run dev`)

4. **Supabase não funciona?**
   - Verifique RLS policies
   - Verifique firewall

---

## ✅ Você está pronto!

Agora é só:
1. ✅ Instalar dependências
2. ✅ Configurar Supabase
3. ✅ Testar local
4. ✅ Deploy no Vercel

**Boa sorte!** 🚀

---

**Last Updated:** 4 de Dezembro de 2025
**Version:** 2.0.0
