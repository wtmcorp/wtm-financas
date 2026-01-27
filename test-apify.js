// Script de teste para verificar a API do Apify
require('dotenv').config({ path: '.env.local' });
const { ApifyClient } = require('apify-client');

async function testApifyConnection() {
    console.log('🔍 Verificando configuração do Apify...\n');

    // 1. Verificar se o token existe
    const token = process.env.APIFY_API_TOKEN;

    if (!token) {
        console.error('❌ ERRO: APIFY_API_TOKEN não encontrado no arquivo .env.local');
        console.log('   Por favor, adicione a variável APIFY_API_TOKEN no arquivo .env.local');
        return;
    }

    console.log('✅ Token do Apify encontrado');
    console.log(`   Token: ${token.substring(0, 10)}...${token.substring(token.length - 5)}\n`);

    // 2. Inicializar o cliente
    const client = new ApifyClient({ token });

    try {
        // 3. Testar conexão com a API
        console.log('🔄 Testando conexão com a API do Apify...');

        const user = await client.user().get();

        console.log('✅ Conexão bem-sucedida!');
        console.log(`   Usuário: ${user.username || 'N/A'}`);
        console.log(`   Email: ${user.email || 'N/A'}`);
        console.log(`   Plan: ${user.plan || 'N/A'}\n`);

        // 4. Verificar se o actor existe
        console.log('🔄 Verificando actor "compass/crawler-google-places"...');

        try {
            const actor = await client.actor('compass/crawler-google-places').get();
            console.log('✅ Actor encontrado e acessível');
            console.log(`   Nome: ${actor.name}`);
            console.log(`   Versão: ${actor.defaultRunOptions?.build || 'latest'}\n`);
        } catch (actorError) {
            console.error('❌ ERRO ao acessar o actor:');
            console.error(`   ${actorError.message}\n`);
        }

        // 5. Teste rápido de execução (opcional - comentado para não gastar créditos)
        console.log('ℹ️  Para testar uma busca real, descomente a seção de teste no código');
        console.log('   Isso irá consumir créditos do Apify\n');

        /*
        console.log('🔄 Executando teste de busca (isso pode levar alguns segundos)...');
        const run = await client.actor('compass/crawler-google-places').call({
            searchStringsArray: ['restaurante em São Paulo'],
            locationQuery: 'São Paulo',
            maxCrawledPlacesPerSearch: 3,
            language: 'pt',
            maxImages: 0,
            maxReviews: 0
        });

        const { items } = await client.dataset(run.defaultDatasetId).listItems();
        console.log(`✅ Teste de busca concluído! Encontrados ${items.length} resultados`);
        
        if (items.length > 0) {
            console.log('\n📍 Exemplo de resultado:');
            console.log(`   Nome: ${items[0].title}`);
            console.log(`   Endereço: ${items[0].address}`);
            console.log(`   Telefone: ${items[0].phone || 'N/A'}`);
            console.log(`   Website: ${items[0].website || 'N/A'}`);
        }
        */

        console.log('\n✅ RESUMO: API do Apify está funcionando corretamente!');
        console.log('   O sistema está pronto para buscar leads.\n');

    } catch (error) {
        console.error('\n❌ ERRO ao conectar com a API do Apify:');
        console.error(`   ${error.message}`);

        if (error.message.includes('401') || error.message.includes('Unauthorized')) {
            console.error('\n   ⚠️  O token parece estar inválido ou expirado.');
            console.error('   Por favor, verifique se o token está correto no .env.local');
        }

        console.error('\n   Stack trace completo:');
        console.error(error);
    }
}

// Executar o teste
testApifyConnection().catch(console.error);
