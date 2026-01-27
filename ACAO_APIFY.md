# 🚀 Plano de Ação: Corrigir Integração Apify

## 📊 Status Atual

| Aspecto | Status | Detalhes |
|---------|--------|----------|
| **Build** | ✅ Passando | Next.js compila sem erros |
| **Estrutura Apify** | ✅ Implementada | `src/lib/apify.ts` e rotas OK |
| **Token Apify** | ❌ **Inválido** | Erro 401: Token não reconhecido |
| **Fallback Nominatim** | ✅ Funcionando | Sistema usará OSM se Apify falhar |
| **Rota /api/sales/leads** | ✅ Pronta | Testável após token válido |

---

## 🔴 Problema: Token Apify Inválido

A chave no `.env.local` retorna erro 401:
```
ApifyApiError: User was not found or authentication token is not valid
```

### Causas possíveis:
1. Token foi revogado na conta Apify
2. Token expirou
3. Token copiado com espaços ou caracteres faltando
4. Conta Apify não está ativa

---

## ✅ Ação Necessária

### **Passo 1: Gerar novo token Apify**

1. Vá para https://console.apify.com/ e faça login
2. Clique em **Settings** (engrenagem no canto inferior esquerdo)
3. Vá para **API tokens**
4. Clique em **Create new token** ou copie token existente
5. **Copie exatamente** (sem espaços)

### **Passo 2: Atualizar `.env.local`**

Substitua a linha:
```env
APIFY_API_TOKEN=apify_api_90rSHPUGyXUoFD1bgHUp9cUQuvRuM82kwUrU
```

Por:
```env
APIFY_API_TOKEN=<seu-novo-token-aqui>
```

### **Passo 3: Validar com o teste**

```bash
cd "c:\Users\Administrator\Desktop\Site Wtm corps finanças"
node test-apify.js
```

**Esperado (sucesso):**
```
✅ CONEXÃO BEM-SUCEDIDA!
   Usuário: seu_username
   Email: seu_email@example.com
   Plan: free / premium
✅ A API do Apify está funcionando perfeitamente!
```

### **Passo 4 (Vercel): Adicionar variável de ambiente**

1. Vá para seu projeto no Vercel
2. **Settings → Environment Variables**
3. Adicione:
   ```
   Nome: APIFY_API_TOKEN
   Valor: <seu-novo-token>
   Ambientes: Production, Preview, Development
   ```
4. Redeploy

---

## 🟡 Alternativa: Usar apenas Nominatim (Gratuito)

Se não quiser usar Apify:
1. Remova a linha `APIFY_API_TOKEN` do `.env.local`
2. Remova de **Environment Variables** do Vercel
3. Sistema usará **Nominatim (OpenStreetMap)** automaticamente
4. ✅ Funcionalidade de leads continua 100% operacional

**Vantagem:** Sem custos, sem limite
**Desvantagem:** Dados menos detalhados que Apify

---

## 📋 Checklist Final

- [ ] Gerar novo token em https://console.apify.com/
- [ ] Copiar exatamente (sem espaços)
- [ ] Atualizar `.env.local`
- [ ] Rodar `node test-apify.js` com sucesso
- [ ] Atualizar variável `APIFY_API_TOKEN` no Vercel
- [ ] Redeploy no Vercel
- [ ] Testar endpoint: `POST /api/sales/leads` com `{ "query": "restaurante", "location": "São Paulo" }`

---

## 🧪 Testar Endpoint em Desenvolvimento

```bash
# Terminal 1: Rodar servidor
npm run dev

# Terminal 2: Fazer requisição
curl -X POST http://localhost:3000/api/sales/leads \
  -H "Content-Type: application/json" \
  -d '{
    "query": "restaurante",
    "location": "São Paulo"
  }'
```

**Esperado:** Array de leads com campos: `empresa`, `cidade`, `score_venda`, `possui_site`, etc.

---

## 🚀 Próximo Passo

1. **Agora:** Gerar novo token Apify
2. **Depois:** Validar com `node test-apify.js`
3. **Depois:** Rodar `npm run dev` e testar endpoint
4. **Depois:** Subir ao Vercel com novo token

---

**Status Geral:** 85% pronto — apenas o token precisa ser regenerado.
