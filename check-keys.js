require('dotenv').config({ path: '.env.local' });

async function checkKeys() {
    const openaiKey = process.env.OPENAI_API_KEY;
    const deepseekKey = process.env.DEEPSEEK_API_KEY;

    console.log("OpenAI Key exists:", !!openaiKey);
    console.log("DeepSeek Key exists:", !!deepseekKey);

    if (deepseekKey) {
        console.log("DeepSeek Key starts with:", deepseekKey.substring(0, 5));
    }
}

checkKeys();
