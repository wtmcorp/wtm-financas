const OpenAI = require('openai');
require('dotenv').config({ path: '.env.local' });

async function testDeepSeek() {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    console.log("DeepSeek Key exists:", !!apiKey);

    if (!apiKey) {
        console.log("No DEEPSEEK_API_KEY found.");
        return;
    }

    console.log("Key starts with:", apiKey.substring(0, 5));

    const deepseek = new OpenAI({
        apiKey: apiKey,
        baseURL: 'https://api.deepseek.com'
    });

    try {
        console.log("Attempting DeepSeek request...");
        const response = await deepseek.chat.completions.create({
            model: "deepseek-chat",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: "Hello" }
            ],
            max_tokens: 10
        });
        console.log("DeepSeek Response Success:", response.choices[0].message.content);
    } catch (e) {
        console.log("DeepSeek Error:", e.message);
        console.log("Full Error:", JSON.stringify(e, null, 2));
    }
}

testDeepSeek();
