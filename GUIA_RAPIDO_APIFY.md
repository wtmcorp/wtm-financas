# 🚀 Guia Rápido - Configurar Apify em 3 Passos

## Passo 1: Obter o Token
1. Acesse: https://console.apify.com/
2. Faça login (ou crie conta grátis)
3. Clique em **Settings** (⚙️) no menu lateral
4. Clique em **Integrations**
5. Copie o **API Token** (ou crie um novo)

## Passo 2: Configurar no Sistema
1. Abra o arquivo `.env.local` na raiz do projeto
2. Adicione esta linha:
   ```
   APIFY_API_TOKEN=seu_token_aqui
   ```
3. Salve o arquivo

## Passo 3: Testar
Execute no terminal:
```bash
node test-apify.js
```

Se ver ✅ "Conexão bem-sucedida", está pronto!

---

## ⚡ Usar o Sistema

1. Acesse o site
2. Clique 5x em "Mercado Live" (no ticker)
3. Digite a senha do WTM Sales OS
4. Vá em "Buscador de Leads"
5. Digite o nicho (ex: "restaurante")
6. Digite a cidade (ex: "São Paulo")
7. Clique em "Mapear Oportunidades"

Pronto! Os leads aparecerão com:
- Nome da empresa
- Endereço
- Telefone/WhatsApp
- Instagram
- Score de oportunidade (0-100)

---

## 💡 Dicas

- **Sem token?** O sistema usa Nominatim (gratuito) automaticamente
- **Plano grátis:** $5 de créditos/mês = ~100-500 buscas
- **Salvar leads:** Clique no ícone de salvar para adicionar ao CRM
- **Envio em massa:** Vá em "CRM / Salvos" → "Enviar para Todos"

---

**Precisa de ajuda?**
- Veja: `APIFY_SETUP.md` (documentação completa)
- Veja: `RELATORIO_APIFY.md` (status da implementação)
