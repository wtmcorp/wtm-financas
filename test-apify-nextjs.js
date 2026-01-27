// Teste direto do token do Apify
const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando arquivo .env.local...\n');

const envPath = path.join(__dirname, '.env.local');

try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');

    console.log('📄 Conteúdo do .env.local:');
    console.log('─'.repeat(50));

    let foundApify = false;
    let apifyToken = '';

    lines.forEach((line, index) => {
        const lineNum = index + 1;

        // Check if line contains APIFY_API_TOKEN
        if (line.includes('APIFY_API_TOKEN')) {
            foundApify = true;
            const match = line.match(/APIFY_API_TOKEN\s*=\s*(.+)/);
            if (match) {
                apifyToken = match[1].trim();
                console.log(`Linha ${lineNum}: ✅ APIFY_API_TOKEN encontrado`);
                console.log(`   Token: ${apifyToken.substring(0, 15)}...${apifyToken.substring(apifyToken.length - 5)}`);
                console.log(`   Tamanho: ${apifyToken.length} caracteres`);
            }
        }
    });

    console.log('─'.repeat(50));

    if (foundApify && apifyToken) {
        console.log('\n✅ Token do Apify encontrado no arquivo!');
        console.log('\n🔄 Testando conexão com a API do Apify...\n');

        // Test the API
        const { ApifyClient } = require('apify-client');
        const client = new ApifyClient({ token: apifyToken });

        client.user().get()
            .then(user => {
                console.log('✅ CONEXÃO BEM-SUCEDIDA!');
                console.log(`   Usuário: ${user.username || 'N/A'}`);
                console.log(`   Email: ${user.email || 'N/A'}`);
                console.log(`   Plan: ${user.plan || 'N/A'}`);
                console.log('\n✅ A API do Apify está funcionando perfeitamente!\n');
            })
            .catch(error => {
                console.error('❌ ERRO ao conectar com a API:');
                console.error(`   ${error.message}`);

                if (error.message.includes('401') || error.message.includes('Unauthorized')) {
                    console.error('\n   ⚠️  O token parece estar inválido ou expirado.');
                }
            });
    } else {
        console.log('\n❌ Token do Apify NÃO encontrado no arquivo.');
    }

} catch (error) {
    console.error('❌ Erro ao ler o arquivo .env.local:');
    console.error(error.message);
}
