# Configuração da API do Apify

## Status da Integração

✅ **Código implementado e funcionando**
- O sistema possui integração completa com a API do Apify
- Biblioteca `apify-client@2.21.0` instalada
- Funções de busca de leads implementadas em `src/lib/apify.ts`
- API endpoint configurado em `src/app/api/sales/leads/route.ts`

## ⚠️ Configuração Necessária

Para que a API do Apify funcione, você precisa adicionar o token de API no arquivo `.env.local`:

### Passo 1: Obter o Token da API

1. Acesse [https://console.apify.com/](https://console.apify.com/)
2. Faça login ou crie uma conta
3. Vá em **Settings** → **Integrations** → **API tokens**
4. Copie seu token de API (ou crie um novo)

### Passo 2: Configurar o Token

Adicione a seguinte linha no arquivo `.env.local` (na raiz do projeto):

```env
APIFY_API_TOKEN=apify_api_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Substitua** `apify_api_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` pelo seu token real.

### Passo 3: Verificar a Configuração

Execute o script de teste para verificar se tudo está funcionando:

```bash
node test-apify.js
```

Se tudo estiver correto, você verá:
- ✅ Token do Apify encontrado
- ✅ Conexão bem-sucedida
- ✅ Actor encontrado e acessível
- ✅ API do Apify está funcionando corretamente

## Como Funciona

### 1. Busca de Leads

O sistema usa o actor `compass/crawler-google-places` do Apify para buscar empresas no Google Maps.

**Endpoint:** `POST /api/sales/leads`

**Parâmetros:**
```json
{
  "query": "restaurante",
  "location": "São Paulo"
}
```

**Resposta:**
```json
{
  "leads": [
    {
      "id": "...",
      "empresa": "Nome da Empresa",
      "nicho": "restaurante",
      "cidade": "São Paulo",
      "instagram": "@empresa",
      "whatsapp": "+5511999999999",
      "email": "",
      "possui_site": false,
      "qualidade_site": "nenhum",
      "score_venda": 95,
      "motivo_oportunidade": "Empresa sem site identificado. Alta oportunidade. Com telefone disponível.",
      "address": "Rua Exemplo, 123"
    }
  ]
}
```

### 2. Fallback Automático

Se o Apify não estiver configurado ou falhar, o sistema automaticamente usa o **Nominatim (OpenStreetMap)** como alternativa gratuita.

**Prioridade:**
1. **Apify** (melhor qualidade de dados) ← Requer token
2. **Nominatim** (gratuito, qualidade menor) ← Fallback automático

### 3. Scoring de Oportunidades

O sistema calcula automaticamente um score de venda para cada lead:

- **+80 pontos**: Empresa sem site
- **+40 pontos**: Empresa com site (oportunidade de redesign)
- **+15 pontos**: Telefone disponível (sem site)
- **+10 pontos**: Telefone disponível (Nominatim)

**Score máximo:** 100 pontos

## Custos do Apify

O Apify oferece um plano gratuito com créditos limitados:
- **Plano Free:** $5 de créditos gratuitos por mês
- **Custo por busca:** Varia conforme o número de resultados
- **Estimativa:** ~100-500 buscas por mês no plano gratuito

Para mais informações: [https://apify.com/pricing](https://apify.com/pricing)

## Arquivos Relacionados

- `src/lib/apify.ts` - Cliente e funções do Apify
- `src/app/api/sales/leads/route.ts` - Endpoint da API
- `test-apify.js` - Script de teste
- `.env.local` - Configuração do token (não versionado)

## Solução de Problemas

### Erro: "APIFY_API_TOKEN não encontrado"
- Verifique se o arquivo `.env.local` existe na raiz do projeto
- Verifique se a variável está escrita corretamente
- Reinicie o servidor de desenvolvimento após adicionar o token

### Erro: "401 Unauthorized"
- O token está inválido ou expirado
- Gere um novo token no console do Apify

### Erro: "Actor not found"
- Verifique sua conexão com a internet
- O actor `compass/crawler-google-places` pode estar indisponível
- O sistema usará automaticamente o Nominatim como fallback

## Teste Rápido

Para testar uma busca real (consome créditos), descomente a seção de teste no arquivo `test-apify.js` e execute:

```bash
node test-apify.js
```

Isso fará uma busca de teste por "restaurante em São Paulo" e mostrará os resultados.
