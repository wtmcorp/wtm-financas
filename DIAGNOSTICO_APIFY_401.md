# 🔧 DIAGNÓSTICO APIFY: Token Válido mas Retorna 401

## 📊 O que descobrimos

✅ **Token está correto e carregado corretamente**
```
apify_api_90rSHPUGyXUoFD1bgHUp9cUQuvRuM82kwUrU
```

✅ **Token aparenta ser válido na UI do Apify**

❌ **MAS: API retorna 401 "User was not found or authentication token is not valid"**

---

## 🔍 Causa Raiz Possível

A discrepância entre "token válido na UI" e "401 na API" geralmente indica:

### 1. **Conta Apify Suspensa ou em Risco**
- Conta pode estar suspensa por:
  - Limite de créditos atingido
  - Atividade suspeita/fatura não paga
  - Violação de termos de serviço
  
### 2. **Token Revogado Internamente**
- Pode ter sido revogado via API mas não foi atualizado na UI
- Ou expirou mas ainda mostra como válido

### 3. **Problema de Compatibilidade**
- ApifyClient v2.21.0 pode ter bug com tokens recentes
- Versão 3.x pode resolver

---

## ✅ Soluções Recomendadas (em ordem de probabilidade)

### **Solução 1: Verificar Status da Conta (5 min)**

1. Acesse https://console.apify.com/account
2. Verifique:
   - ✅ Status da conta (deve ser "Active")
   - ✅ Plano (Free/Paid)
   - ✅ Créditos disponíveis (se Paid)
   - ✅ Sem avisos de suspensão

**Se houver problema de account:** Entre em contato com suporte Apify

---

### **Solução 2: Gerar NOVO Token (2 min)**

Mesmo o token aparentando válido, pode ser stale internamente:

1. Vá para Settings → API tokens
2. Clique em **Delete** no token atual
3. Clique em **Create a new token**
4. **Copie imediatamente** (não recarregue a página)
5. Atualize `.env.local`:
   ```env
   APIFY_API_TOKEN=apify_api_<novo-token>
   ```
6. Teste com:
   ```bash
   node test-apify-debug.js
   ```

---

### **Solução 3: Atualizar ApifyClient (2 min)**

Se o token novo ainda não funcionar, atualize a biblioteca:

```bash
npm install apify-client@3.x --save
```

**Nota:** Versão 3.x pode ter API ligeiramente diferente. Se for este o caso, avise e adapto o código.

---

### **Solução 4: Usar Fallback Nominatim (Rápido)**

Se Apify não funcionar em tempo, o sistema já tem fallback:

```bash
# Remova a linha de APIFY do .env.local
# Sua API de leads continuará funcionando via Nominatim (OSM)
```

---

## 🚀 Meu Recomendação (Ordem)

1. **Primeiro:** Verifique status da conta em https://console.apify.com/account
2. **Se OK:** Gere novo token e teste
3. **Se ainda falhar:** Atualize para ApifyClient v3.x
4. **Fallback:** Use Nominatim (já funciona)

---

## 📝 Status do Sistema

| Componente | Status | Ação |
|-----------|--------|------|
| Build | ✅ Funcionando | Nenhuma |
| Integração | ✅ Implementada | Nenhuma |
| Token | ⚠️ 401 Error | Diagnosticar conta |
| Fallback | ✅ Pronto | Usar se Apify falhar |

---

## 💡 Próximo Passo

**Você fazer:** Verificar status da conta Apify e tentar gerar novo token
**Eu fazer:** Adaptar código se necessário ou ativar fallback

Quer que eu implemente algo agora enquanto você resolve a conta?
