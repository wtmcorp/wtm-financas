// Test Apify API with detailed debugging
require('dotenv').config({ path: '.env.local' });

const token = process.env.APIFY_API_TOKEN;

console.log('═══════════════════════════════════════════════════════════');
console.log('🧪 TESTE APIFY API - DIAGNÓSTICO DETALHADO');
console.log('═══════════════════════════════════════════════════════════\n');

if (!token) {
    console.log('❌ ERRO: Token não encontrado em .env.local');
    console.log('Arquivo .env.local encontrado mas token vazio');
    process.exit(1);
}

console.log('✅ Token encontrado');
console.log(`   Valor: ${token.substring(0, 20)}...${token.substring(token.length - 10)}`);
console.log(`   Tamanho: ${token.length} caracteres\n`);

// Test 1: Direct fetch to API
console.log('📡 Teste 1: Requisição HTTP direta\n');

fetch('https://api.apify.com/v2/users/me', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
})
    .then(res => {
        console.log(`   Status HTTP: ${res.status} ${res.statusText}`);
        return res.json();
    })
    .then(data => {
        if (data.username) {
            console.log('✅ SUCESSO com fetch HTTP direto!');
            console.log(`   Usuário: ${data.username}`);
            console.log(`   Email: ${data.email}`);
            console.log(`   Plano: ${data.plan}`);
        } else {
            console.log('❌ Resposta recebida mas sem dados de usuário:');
            console.log(JSON.stringify(data, null, 2));
        }
    })
    .catch(err => {
        console.log(`❌ Erro no fetch: ${err.message}`);
    })
    .finally(() => {
        // Test 2: Using ApifyClient
        console.log('\n📦 Teste 2: Usando ApifyClient\n');

        try {
            const { ApifyClient } = require('apify-client');
            const client = new ApifyClient({ token });

            client.user().get()
                .then(user => {
                    console.log('✅ SUCESSO com ApifyClient!');
                    console.log(`   Usuário: ${user.username}`);
                    console.log(`   Email: ${user.email}`);
                    console.log(`   Plano: ${user.plan}`);
                    console.log('\n═══════════════════════════════════════════════════════════');
                    console.log('✅ TUDO FUNCIONANDO - API PRONTA PARA USO');
                    console.log('═══════════════════════════════════════════════════════════');
                })
                .catch(err => {
                    console.log(`❌ ApifyClient error: ${err.message}`);
                    console.log(`   Tipo: ${err.type}`);
                    console.log(`   Status: ${err.statusCode}`);
                    console.log('\n═══════════════════════════════════════════════════════════');
                    console.log('⚠️  PROBLEMA: Token válido mas API retorna 401');
                    console.log('═══════════════════════════════════════════════════════════');
                    console.log('\nPossíveis causas:');
                    console.log('1. Conta Apify está suspensa');
                    console.log('2. Token foi revogado (mas aparenta válido na UI)');
                    console.log('3. Problema de compatibilidade com ApifyClient v2.21.0');
                    console.log('\nSolução recomendada:');
                    console.log('- Copie um novo token direto da página de settings');
                    console.log('- Ou atualize ApifyClient para a versão 3.x');
                });
        } catch (err) {
            console.log(`❌ Erro ao carregar ApifyClient: ${err.message}`);
        }
    });
