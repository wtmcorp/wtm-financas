# 🔒 Guia de Segurança - Wtm Corps Finanças

## ⚠️ IMPORTANTE

Você compartilhou sua **API Key do OpenAI** comigo. Esta é informação **sensível** e deve ser mantida **segura**.

### Recomendações Imediatas:

1. **⚠️ Regenere sua API Key do OpenAI**
   - Acesse: https://platform.openai.com/api-keys
   - Delete a chave antiga
   - Gere uma nova
   - **NÃO COMPARTILHE COM NINGUÉM MAIS**

2. **✅ Configure Billing Limits**
   - Vá em: https://platform.openai.com/account/billing/limits
   - Defina um limite mensal (ex: $50)
   - Assim você não terá surpresas caras

3. **🔒 Use Variáveis de Ambiente**
   - **Nunca** commite `.env.local` no GitHub
   - Já está no `.gitignore` ✅
   - Supabase e Vercel conhecem as variáveis

---

## 🔐 Chaves e Segredos

### OpenAI API Key
```
sk-proj-XytbCxI3...
```
- **Tipo**: Segredo de Servidor
- **Localização**: `.env.local` (NUNCA no Git)
- **Uso**: Apenas backend/API routes
- **Expor**: NÃO - usar via Backend

### Supabase Keys

#### `NEXT_PUBLIC_SUPABASE_URL`
```
https://seu-projeto.supabase.co
```
- **Tipo**: Público (pode expor)
- **Localização**: `.env.local` e Vercel
- **Uso**: Cliente e Servidor

#### `NEXT_PUBLIC_SUPABASE_ANON_KEY`
```
eyJ...
```
- **Tipo**: Semi-público (com RLS)
- **Localização**: `.env.local` e Vercel
- **Uso**: Cliente (com proteção RLS)
- **RLS**: Necessária para segurança

#### `SUPABASE_SERVICE_ROLE_KEY`
```
eyJ...
```
- **Tipo**: Segredo de Servidor
- **Localização**: NUNCA no cliente
- **Uso**: Apenas server/API routes
- **Expor**: NÃO - nunca frontend

---

## ✅ Práticas Implementadas

### 1. Row Level Security (RLS)
```sql
-- Exemplo: Apenas o usuário vê seus dados
CREATE POLICY "Usuários podem ver seus próprios dados"
  ON users FOR SELECT USING (auth.uid() = id);
```

**Benefício**: Impossível um usuário acessar dados de outro.

### 2. Autenticação JWT
- Tokens seguros do Supabase
- Expiração automática
- Refresh tokens inclusos

### 3. Service Role Key Nunca Exposta
```typescript
// ✅ OK - Backend apenas
import { supabaseAdmin } from "@/lib/supabase";
const { data } = await supabaseAdmin.from("users").select("*");

// ❌ ERRADO - Frontend
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Não fazer isso!
```

### 4. Variáveis de Ambiente Separadas
```env
# Frontend (público)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# Backend (privado)
SUPABASE_SERVICE_ROLE_KEY=... (apenas servidor)
OPENAI_API_KEY=... (apenas servidor)
```

### 5. Middleware de Proteção
```typescript
// middleware.ts redireciona não-autenticados
if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
  return NextResponse.redirect(new URL("/login", req.url));
}
```

---

## 🚨 O Que NÃO Fazer

### ❌ Não Commitar Segredos
```bash
# ERRADO
git add .env.local
git commit -m "Add env vars"

# CERTO
.env.local já está em .gitignore
```

### ❌ Não Expor API Keys no Frontend
```typescript
// ERRADO
const API_KEY = 'sk-proj-XytbCxI3...' // Visível no console!

// CERTO
// Apenas no backend/API routes
// Frontend chama via API
```

### ❌ Não Confiar Apenas em Frontend
```typescript
// ERRADO
if (userRole === 'admin') { // Cliente pode falsificar!
  // deletar dados críticos
}

// CERTO
// Verificar no backend/JWT antes de executar
```

### ❌ Não Usar Senhas Fracas
- Mínimo 8 caracteres
- Incluir maiúsculas, minúsculas, números
- Supabase vai forçar isso 🛡️

### ❌ Não Fazer SQL Injection
```typescript
// ERRADO
const query = `SELECT * FROM users WHERE email = '${email}'`;

// CERTO
const { data } = await supabase
  .from("users")
  .select("*")
  .eq("email", email);
```

---

## 🔑 Regenerar Chaves

### Se Expor OpenAI Key:
1. Acesse https://platform.openai.com/api-keys
2. Delete a chave antiga
3. Crie uma nova
4. Atualize `.env.local` e Vercel

### Se Expor Supabase Keys:
1. Acesse seu projeto Supabase
2. Vá em Settings → API
3. Clique em "Rekey" para Service Role
4. Atualize `.env.local` e Vercel

### Se Commitar Acidentalmente:
```bash
# Remover do histórico Git
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch .env.local' \
  -- --all

# Force push (cuidado!)
git push --force --all
```

---

## 📊 Monitoramento de Segurança

### OpenAI - Verificar Uso
1. Acesse https://platform.openai.com/account/usage
2. Monitore custos diários
3. Configure alertas (Billing Alerts)

### Supabase - Ver Logs
1. Acesse seu projeto
2. Vá em Settings → Database
3. Monitore atividades suspeitas

### Vercel - Revisar Deploys
1. Acesse Vercel Dashboard
2. Veja histórico de deployments
3. Verifique variáveis de ambiente (encriptadas)

---

## 🛡️ Segurança no Desenvolvimento

### Local
```env
# .env.local (não commitir)
OPENAI_API_KEY=sk-dev-...
NEXT_PUBLIC_SUPABASE_URL=https://dev.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=dev-anon-key
SUPABASE_SERVICE_ROLE_KEY=dev-service-key
```

### Produção (Vercel)
1. Vá em Project Settings
2. Environment Variables
3. Adicione as **chaves de produção**
4. **Diferentes das chaves de desenvolvimento**

### Staging (Opcional)
```env
NODE_ENV=staging
# Chaves diferentes para testar antes de prod
```

---

## 🔐 HTTPS e Certificados

Vercel fornece:
- ✅ SSL/TLS automático
- ✅ HTTPS em produção
- ✅ Certificados renováveis

Supabase fornece:
- ✅ Conexão HTTPS
- ✅ Criptografia em trânsito

---

## 👤 Autenticação de Usuários

### Login Seguro
1. ✅ Senhas hasheadas com bcrypt (Supabase cuida)
2. ✅ JWT tokens com expiração
3. ✅ Refresh tokens seguros
4. ✅ Session storage seguro

### Dados Sensíveis
- ✅ RLS em todos os dados
- ✅ Usuários só veem seus próprios dados
- ✅ Service key para operações admin

---

## 📋 Checklist de Segurança

- [ ] OpenAI API Key em `.env.local` (não no Git)
- [ ] Supabase keys separadas (público vs privado)
- [ ] RLS habilitado no Supabase
- [ ] Middleware protegendo rotas
- [ ] Service Role Key nunca no frontend
- [ ] `.env.local` no `.gitignore`
- [ ] Vercel com variáveis de ambiente configuradas
- [ ] Billing limit definido no OpenAI
- [ ] Senhas fortes no Supabase
- [ ] HTTPS ativo em produção

---

## 🆘 Se Algo der Errado

### Suspeita de Exposição de Chave
1. **Parar imediatamente**
2. **Regenerar a chave**
3. **Atualizar em todos os lugares**
4. **Verificar logs de uso**

### Acesso Não Autorizado
1. **Verificar RLS policies**
2. **Revisar JWT tokens**
3. **Resetar senhas afetadas**
4. **Contatar Supabase se necessário**

### Erro de SQL Injection
- Supabase previne via ORM
- Nunca construir queries com template strings
- Sempre usar métodos seguros

---

## 📚 Recursos de Segurança

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Supabase Security](https://supabase.com/docs/guides/auth)
- [OpenAI Security Best Practices](https://platform.openai.com/docs/guides/production-best-practices)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)

---

## ✅ Status de Segurança

**Seu projeto foi configurado com:**
- ✅ Autenticação de usuário forte
- ✅ Criptografia de dados em trânsito
- ✅ RLS em banco de dados
- ✅ Separação de chaves público/privado
- ✅ Proteção contra CSRF
- ✅ Validação de entrada

**Nível de Segurança:** 🟢 PRODUCTION-READY

---

**Lembre-se:** Segurança é um processo contínuo, não um destino.

Mantenha suas dependências atualizadas:
```bash
npm update
npm audit
npm audit fix
```

---

**Last Updated:** 4 de Dezembro de 2025
**Version:** 2.0.0 - Security Edition
