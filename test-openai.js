const OpenAI = require('openai');
require('dotenv').config({ path: '.env.local' });

async function test() {
    const apiKey = process.env.OPENAI_API_KEY;
    console.log("Key exists:", !!apiKey);
    if (apiKey) {
        console.log("Key starts with:", apiKey.substring(0, 5));
        console.log("Key length:", apiKey.length);

        const openai = new OpenAI({ apiKey });
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: "hi" }],
                max_tokens: 5
            });
            console.log("OpenAI Response successful");
        } catch (e) {
            console.log("OpenAI Error:", e.message);
        }
    } else {
        console.log("No OPENAI_API_KEY found in .env.local");
    }
}

test();
