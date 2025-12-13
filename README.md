# 💰 Wtm Corps Finanças

Plataforma completa de gestão financeira pessoal com ferramentas inteligentes e assistente AI.

## 🚀 Funcionalidades

- 📊 **Fluxo de Caixa**: Controle de receitas e despesas com resumo visual
- 💳 **Comparador de Cartões**: Análise de cartões de crédito dos principais bancos
- 🎯 **Metas Financeiras**: Planejamento e acompanhamento de objetivos
- 💡 **Renda Extra**: Ideias práticas com calculadora de ganhos
- 📈 **Calculadoras**: Empréstimos, orçamento 50-30-20, quitação de dívidas
- 🤖 **Wtm AI**: Assistente financeiro inteligente powered by ChatGPT
- 📚 **Educação Financeira**: Conteúdo e dicas para melhorar suas finanças

## 🛠️ Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Framer Motion** - Animações
- **Lucide React** - Ícones

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.local.example .env.local
# Edite .env.local com suas chaves de API

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 🌐 Deploy

Este projeto está otimizado para deploy na **Vercel**:

1. Faça push para o GitHub
2. Conecte seu repositório na [Vercel](https://vercel.com)
3. Configure as variáveis de ambiente
4. Deploy automático!

## 📝 Variáveis de Ambiente

Crie um arquivo `.env.local` com:

```env
OPENAI_API_KEY=sua_chave_aqui
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🎨 Principais Componentes

- **ExpenseTracker**: Gerenciador de fluxo de caixa
- **ExtraIncomeIdeas**: Ideias de renda extra com calculadora
- **DebtPayoffCalculator**: Calculadora de quitação de dívidas (método Snowball)
- **ChatBubble**: Assistente AI integrado
- **CreditCards**: Comparador de cartões de crédito

## 📄 Licença

MIT

---

Desenvolvido com 💚 para ajudar você a ter uma vida financeira mais saudável!
