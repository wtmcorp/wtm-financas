#!/bin/bash

echo "🚀 Wtm Corps Finanças - Setup Inicial"
echo "======================================"
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null
then
    echo "❌ Node.js não está instalado. Instale em: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js versão: $(node -v)"
echo ""

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

echo "✅ Dependências instaladas com sucesso!"
echo ""

# Verificar arquivo .env.local
if [ ! -f .env.local ]; then
    echo "⚠️  Arquivo .env.local não encontrado"
    echo "Copiando de .env.example..."
    cp .env.example .env.local
    echo "✅ Arquivo criado. IMPORTANTE: Preencha as variáveis de ambiente!"
else
    echo "✅ Arquivo .env.local encontrado"
fi

echo ""
echo "======================================"
echo "✅ Setup Inicial Completo!"
echo "======================================"
echo ""
echo "Próximos passos:"
echo "1. Preencha o arquivo .env.local com suas credenciais:"
echo "   - NEXT_PUBLIC_SUPABASE_URL"
echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "   - SUPABASE_SERVICE_ROLE_KEY"
echo ""
echo "2. Crie as tabelas no Supabase usando SETUP_COMPLETO.md"
echo ""
echo "3. Rode o servidor:"
echo "   npm run dev"
echo ""
echo "4. Acesse: http://localhost:3000"
echo ""
