const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyBEw72hQUupXqm3u_1iVdKOKXqOUjjhxl8");

async function listModels() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Dummy model to get client
        // The SDK doesn't have a direct listModels method exposed easily on the main class in all versions,
        // but we can try to infer or just test a few common ones.
        // Actually, let's just try to generate content with a few known models and see which one works.

        const models = ["gemini-pro", "gemini-1.5-flash", "gemini-1.5-pro", "gemini-1.0-pro"];

        for (const m of models) {
            console.log(`Testing model: ${m}`);
            try {
                const model = genAI.getGenerativeModel({ model: m });
                const result = await model.generateContent("Hello");
                const response = await result.response;
                console.log(`SUCCESS: ${m} works! Response: ${response.text()}`);
                return; // Found one!
            } catch (e) {
                console.log(`FAILED: ${m} - ${e.message}`);
            }
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
