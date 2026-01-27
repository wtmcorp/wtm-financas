# ANÁLISE: Integração Apify API — Status e Problemas

## ✅ O que está certo

### 1. **Estrutura de Integração**
- ✅ Pacote `apify-client` está instalado (`^2.21.0`)
- ✅ Variável de ambiente `APIFY_API_TOKEN` configurada no `.env.local`
- ✅ Arquivo `src/lib/apify.ts` implementado corretamente com função `searchBusinessLeads()`
- ✅ Rota de API `/api/sales/leads` integrada e funcionando
- ✅ Sistema de fallback implementado (Apify → Nominatim)
- ✅ Rota de teste `/api/test-apify` criada para diagnóstico

### 2. **Fluxo de Dados**
- ✅ Query e location validados
- ✅ Mapeo de campos Apify para leads estruturado
- ✅ Score de oportunidade calculado
- ✅ Tratamento de erro com fallback para Nominatim (OSM)

---

## ❌ O que está errado

### **PROBLEMA CRÍTICO: Token Apify Inválido**

**Erro identificado:**
```
ApifyApiError: User was not found or authentication token is not valid
statusCode: 401
type: user-or-token-not-found
```

**O que significa:**
- A chave API `apify_api_90rSHPUGyXUoFD1bgHUp9cUQuvRuM82kwUrU` é **inválida ou expirada**
- Pode ser:
  1. Token foi revogado na conta Apify
  2. Token expirou
  3. Token copiado incorretamente (espaços, caracteres faltando)
  4. Token não pertence a uma conta ativa

---

## 🔧 Soluções

### **Opção 1: Regenerar Token Apify (Recomendado)**

1. Acesse https://console.apify.com/
2. Login com sua conta
3. Vá para **Settings → API tokens**
4. Clique em **Create new token** ou copie o token existente
5. Copie exatamente e sem espaços
6. Substitua em `.env.local`:
   ```
   APIFY_API_TOKEN=<novo-token-aqui>
   ```
7. Rode o teste novamente:
   ```bash
   node test-apify.js
   ```

### **Opção 2: Usar apenas Nominatim (Fallback)**

Se não quiser usar Apify por enquanto:
1. Remova `APIFY_API_TOKEN` do `.env.local`
2. O sistema automaticamente usará Nominatim (gratuito, sem limite)
3. Funcionalidade de leads continuará funcionando normalmente

### **Opção 3: Verificar Conta Apify**

1. Login em https://console.apify.com/
2. Confirme que a conta está ativa
3. Confirme que tem créditos disponíveis
4. Gere um novo token

---

## 📋 Checklist para Deploy

- [ ] **Validar chave Apify** — execute `node test-apify.js` com sucesso
- [ ] **Ou remover APIFY_API_TOKEN** do `.env.local` (usará Nominatim como fallback)
- [ ] **Adicionar ao Vercel** (se usar Apify):
  - Em **Settings → Environment Variables** do projeto Vercel, adicione:
    ```
    APIFY_API_TOKEN=<seu-novo-token>
    ```
- [ ] **Testar endpoint** em produção: `POST /api/sales/leads` com `{ query: "restaurante", location: "São Paulo" }`

---

## 🚀 Status Pronto para Deploy?

- **Estrutura:** ✅ Pronta
- **Token Apify:** ❌ **Inválido — Ação necessária**
- **Fallback Nominatim:** ✅ Funcionando (se Apify falhar)

### Próximo Passo:
1. Gere um novo token Apify ou remova a chave
2. Teste com `node test-apify.js`
3. Se passar, está 100% pronto para subir ao Vercel

---

## 📚 Arquivos Relacionados

- `src/lib/apify.ts` — Função principal
- `src/app/api/sales/leads/route.ts` — Endpoint para busca de leads
- `src/app/api/test-apify/route.ts` — Rota de diagnóstico
- `test-apify.js` — Script local de teste
- `.env.local` — Variáveis de ambiente (não commitar)
